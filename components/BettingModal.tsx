import { useState, useRef, useEffect } from "react";
import {
	X,
	Check,
	ChevronLeft,
	ChevronRight,
	TrendingUp,
	TrendingDown,
	Wallet,
} from "lucide-react";
import { BinaryMarket } from "../lib/data";
import { getAllMarkets, getMarketById } from "@/dal/market";
import { toast } from "sonner";
import { AgentLogoWrapper } from "./AgentLogoWrapper";
import { useWallet } from "@/lib/WalletContext";
import { executeBet, switchNetwork, NETWORK_CONFIG } from "@/lib/services/betting";
import { fetchMyriadMarket } from "@/lib/myriad-client";

interface BettingModalProps {
	isOpen: boolean;
	onClose: () => void;
	selectedMarketId?: string;
	onMarketSwipe?: (marketId: string) => void;
	preSelectedOutcome?: "YES" | "NO";
	onAgentClick?: (agentId: string) => void;
}

export function BettingModal({
	isOpen,
	onClose,
	selectedMarketId = "market-1",
	onMarketSwipe,
	preSelectedOutcome,
	onAgentClick,
}: BettingModalProps) {
	const [selectedOutcome, setSelectedOutcome] = useState<"YES" | "NO" | null>(
		preSelectedOutcome || null
	);
	const [betAmount, setBetAmount] = useState<string>("");
	const [isProcessing, setIsProcessing] = useState(false);
	const [txStatus, setTxStatus] = useState<"idle" | "confirming" | "confirmed">(
		"idle"
	);
	const [showSwipeHint, setShowSwipeHint] = useState(true);
	const [isTransitioning, setIsTransitioning] = useState(false);
	const [markets, setMarkets] = useState<BinaryMarket[]>([]);
	const touchStartX = useRef<number>(0);
	const touchEndX = useRef<number>(0);

	// Fetch all markets
	useEffect(() => {
		async function fetchMarkets() {
			try {
				const allMarkets = await getAllMarkets();
				setMarkets(allMarkets);
			} catch (error) {
				console.error("Failed to fetch markets:", error);
			}
		}
		if (isOpen) {
			fetchMarkets();
		}
	}, [isOpen]);

	// Get current market
	const currentMarketIndex = markets.findIndex(
		(m) => m.id === selectedMarketId
	);
	const currentMarket = currentMarketIndex >= 0
		? markets[currentMarketIndex]
		: markets[0];

	// Set pre-selected outcome when modal opens
	useEffect(() => {
		if (isOpen && preSelectedOutcome) {
			setSelectedOutcome(preSelectedOutcome);
		}
	}, [isOpen, preSelectedOutcome]);

	// Hide swipe hint after 4 seconds
	useEffect(() => {
		if (isOpen) {
			setShowSwipeHint(true);
			const timer = setTimeout(() => {
				setShowSwipeHint(false);
			}, 4000);
			return () => clearTimeout(timer);
		}
	}, [isOpen, selectedMarketId]);

	// Swipe detection handlers
	const handleTouchStart = (e: React.TouchEvent) => {
		touchStartX.current = e.touches[0].clientX;
	};

	const handleTouchMove = (e: React.TouchEvent) => {
		touchEndX.current = e.touches[0].clientX;
	};

	const handleTouchEnd = () => {
		const swipeThreshold = 50;
		const diff = touchStartX.current - touchEndX.current;

		if (Math.abs(diff) > swipeThreshold) {
			if (diff > 0) {
				// Swiped left - go to next market
				navigateMarket("next");
			} else {
				// Swiped right - go to previous market
				navigateMarket("prev");
			}
			setShowSwipeHint(false);
		}
	};

	const navigateMarket = (direction: "prev" | "next") => {
		let newIndex = currentMarketIndex;

		if (direction === "next") {
			newIndex = (currentMarketIndex + 1) % markets.length;
		} else {
			newIndex =
				currentMarketIndex === 0
					? markets.length - 1
					: currentMarketIndex - 1;
		}

		setIsTransitioning(true);

		if (onMarketSwipe) {
			onMarketSwipe(markets[newIndex].id);
		}

		// Reset transition state after animation
		setTimeout(() => {
			setIsTransitioning(false);
		}, 300);

		// Reset selection when changing markets
		setSelectedOutcome(null);
	};

	// Move hook to top level
	const { account, isConnected, connectWallet, signer, provider, chainId } = useWallet();

	if (!isOpen || !currentMarket) return null;

	const odds =
		selectedOutcome === "YES" ? currentMarket.yesOdds : currentMarket.noOdds;
	const potentialReturn = betAmount
		? (parseFloat(betAmount) * odds).toFixed(2)
		: "0.00";
	const fee = betAmount ? (parseFloat(betAmount) * 0.01).toFixed(2) : "0.00"; // 1% fee

	const handlePlaceBet = async () => {
		if (!selectedOutcome || !betAmount || parseFloat(betAmount) <= 0) {
			toast.error("Please select an outcome and enter a valid bet amount");
			return;
		}

		// Check wallet connection
		if (!isConnected || !signer || !provider) {
			toast.error("Wallet not connected", {
				description: "Please connect your wallet to place a bet",
				action: {
					label: "Connect",
					onClick: connectWallet,
				},
			});
			return;
		}

		setIsProcessing(true);
		setTxStatus("confirming");

		try {
			// Get the Myriad market data for network info
			const myriadMarketId = currentMarket.id.replace("myriad-", "");
			const isMyriadMarket = currentMarket.id.startsWith("myriad-") || currentMarket.id === "lebron-james";

			if (!isMyriadMarket) {
				throw new Error("This market does not support on-chain betting yet");
			}

			// Fetch fresh market data from Myriad
			let myriadMarket;
			if (currentMarket.id === "lebron-james") {
				myriadMarket = await fetchMyriadMarket(3, 59141); // LeBron market on Linea
			} else {
				myriadMarket = await fetchMyriadMarket(parseInt(myriadMarketId), currentMarket.agent.id === "myriad" ? 59141 : 11124);
			}

			const networkId = myriadMarket.networkId;
			const networkConfig = NETWORK_CONFIG[networkId as keyof typeof NETWORK_CONFIG];

			// Check if user is on correct network
			if (chainId !== networkId) {
				toast.info("Switching network...", {
					description: `Please switch to ${networkConfig.name}`,
				});

				try {
					await switchNetwork(networkId, provider);
					// Wait a bit for network switch to complete
					await new Promise((resolve) => setTimeout(resolve, 1000));
				} catch (error: any) {
					throw new Error(`Failed to switch to ${networkConfig.name}: ${error.message}`);
				}
			}

			// Determine outcome ID (YES = 0, NO = 1)
			const outcomeId = selectedOutcome === "YES" ? 0 : 1;
			const amount = parseFloat(betAmount);

			toast.info("Requesting approval...", {
				description: "Please approve the token spend in your wallet",
			});

			// Execute the bet
			const txHash = await executeBet(
				signer,
				myriadMarket,
				outcomeId,
				amount,
				0.01 // 1% slippage
			);

			setTxStatus("confirmed");

			toast.success("Bet placed successfully!", {
				description: `Transaction: ${txHash.slice(0, 10)}...${txHash.slice(-8)}`,
				action: {
					label: "View",
					onClick: () => window.open(`${networkConfig.blockExplorer}/tx/${txHash}`, "_blank"),
				},
				duration: 6000,
			});

			// Wait a bit before closing
			await new Promise((resolve) => setTimeout(resolve, 2000));

			// Close modal and reset
			onClose();
			setSelectedOutcome(null);
			setBetAmount("");
		} catch (error: any) {
			console.error("Bet failed:", error);

			let errorMessage = "Failed to place bet";
			let errorDescription = error.message || "Please try again";

			if (error.code === 4001) {
				errorMessage = "Transaction rejected";
				errorDescription = "You rejected the transaction in your wallet";
			} else if (error.message?.includes("insufficient funds") || error.message?.includes("Insufficient")) {
				errorMessage = "Insufficient balance";
				errorDescription = error.message?.includes("token")
					? error.message
					: "You don't have enough tokens or ETH for gas";
			} else if (error.message?.includes("user rejected") || error.message?.includes("rejected")) {
				errorMessage = "Transaction rejected";
				errorDescription = "You rejected the transaction";
			} else if (error.message?.includes("Token contract not found")) {
				errorMessage = "Token not found";
				errorDescription = "Make sure you're on the correct network and have the required tokens (USDC on Linea, PTS on Abstract)";
			} else if (error.message?.includes("not yet supported")) {
				errorMessage = "Network not supported";
				errorDescription = error.message;
			} else if (error.message?.includes("token balance")) {
				errorMessage = "No tokens in wallet";
				errorDescription = "You need USDC tokens to bet. Contact Myriad Protocol team for testnet USDC, or see GET_USDC_TESTNET.md";
			}

			toast.error(errorMessage, {
				description: errorDescription,
			});
		} finally {
			setIsProcessing(false);
			setTxStatus("idle");
		}
	};

	const addToBet = (amount: number) => {
		const current = parseFloat(betAmount) || 0;
		setBetAmount((current + amount).toString());
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
			<div
				className="relative w-full max-w-[560px] bg-white rounded-xl border-2 border-black max-h-[90vh] overflow-y-auto"
				style={{ boxShadow: "0 20px 60px rgba(0, 0, 0, 0.25)" }}
			>
				{/* Close Button */}
				<button
					onClick={onClose}
					className="absolute top-5 right-5 p-1.5 hover:bg-[#f5f5f5] rounded-lg transition-colors z-10"
					disabled={isProcessing}
				>
					<X size={20} />
				</button>

				{/* Content */}
				<div
					className="p-6 md:p-7"
					onTouchStart={handleTouchStart}
					onTouchMove={handleTouchMove}
					onTouchEnd={handleTouchEnd}
				>
					{/* Swipe Helper - Mobile Only */}
					{showSwipeHint && (
						<div className="md:hidden mb-4 flex justify-center pointer-events-none">
							<div
								className="bg-black text-white px-3 py-2 rounded-full shadow-lg flex items-center gap-2 text-xs animate-fadeIn"
								style={{ fontFamily: "Space Mono" }}
							>
								<ChevronLeft size={14} className="animate-pulse" />
								<span>Swipe to browse markets</span>
								<ChevronRight size={14} className="animate-pulse" />
							</div>
						</div>
					)}

					{/* Market Counter - Mobile Only */}
					<div className="md:hidden mb-5 border-b border-[#eaeaea] pb-4">
						<div className="flex items-center justify-between mb-3">
							<button
								onClick={() => navigateMarket("prev")}
								className="p-2 hover:bg-[#f5f5f5] rounded-lg transition-colors"
								aria-label="Previous market"
								disabled={isProcessing}
							>
								<ChevronLeft size={18} />
							</button>

							<div className="text-center flex-1">
								<p
									className="text-xs text-[#9e9e9e]"
									style={{ fontFamily: "Space Mono" }}
								>
									Market {currentMarketIndex + 1} of {markets.length}
								</p>
								<p
									className="text-sm font-medium mt-0.5 line-clamp-1"
									style={{ fontFamily: "Space Grotesk" }}
								>
									{currentMarket.question}
								</p>
							</div>

							<button
								onClick={() => navigateMarket("next")}
								className="p-2 hover:bg-[#f5f5f5] rounded-lg transition-colors"
								aria-label="Next market"
								disabled={isProcessing}
							>
								<ChevronRight size={18} />
							</button>
						</div>

						{/* Pagination Dots */}
						<div className="flex items-center justify-center gap-1.5">
							{markets.map((market, index) => (
								<button
									key={market.id}
									onClick={() => onMarketSwipe && onMarketSwipe(market.id)}
									disabled={isProcessing}
									className={`h-1.5 rounded-full transition-all ${index === currentMarketIndex
											? "w-6 bg-black"
											: "w-1.5 bg-[#e0e0e0] hover:bg-[#c0c0c0]"
										}`}
									aria-label={`Go to ${market.question}`}
								/>
							))}
						</div>
					</div>

					{/* Header */}
					<div
						className={`mb-6 transition-opacity duration-300 ${isTransitioning ? "opacity-50" : "opacity-100"
							}`}
					>
						<div className="flex items-start justify-between mb-3">
							<div>
								<h2
									className="text-xl md:text-2xl font-bold mb-1.5"
									style={{ fontFamily: "Space Grotesk" }}
								>
									Place Your Bet
								</h2>
								<p
									className="text-[#666] text-sm md:text-base"
									style={{ fontFamily: "Space Mono" }}
								>
									Pick a side. Watch live. Settle at T+7d.
								</p>
							</div>
						</div>

						{/* Wallet Status */}
						{!isConnected ? (
							<div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
								<div className="flex items-center gap-2 mb-2">
									<Wallet size={16} className="text-yellow-600" />
									<span
										className="text-sm font-medium text-yellow-800"
										style={{ fontFamily: "Space Grotesk" }}
									>
										Wallet Required
									</span>
								</div>
								<p
									className="text-xs text-yellow-700 mb-2"
									style={{ fontFamily: "Space Mono" }}
								>
									Connect your wallet to place bets on-chain
								</p>
								<button
									onClick={connectWallet}
									className="w-full py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm font-medium"
									style={{ fontFamily: "Space Grotesk" }}
								>
									Connect Wallet
								</button>
							</div>
						) : (
							<div className="p-3 bg-green-50 border border-green-200 rounded-lg">
								<div className="flex items-center gap-2">
									<Wallet size={16} className="text-green-600" />
									<span
										className="text-xs font-medium text-green-800"
										style={{ fontFamily: "Space Mono" }}
									>
										{account?.slice(0, 6)}...{account?.slice(-4)}
									</span>
									<span
										className="text-xs text-green-600 ml-auto"
										style={{ fontFamily: "Space Mono" }}
									>
										Connected ✓
									</span>
								</div>
							</div>
						)}
					</div>

					{/* Market Question */}
					<div
						className={`mb-6 p-4 bg-[#fafafa] rounded-lg border border-[#eaeaea] transition-opacity duration-300 ${isTransitioning ? "opacity-50" : "opacity-100"
							}`}
					>
						<div className="flex items-start gap-3">
							<div
								className="flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
								onClick={(e) => {
									e.stopPropagation();
									if (onAgentClick) onAgentClick(currentMarket.agent.id);
								}}
							>
								<AgentLogoWrapper
									agentId={currentMarket.agent.id}
									size="small"
								/>
							</div>
							<div className="flex-1 min-w-0">
								<p
									className="text-xs text-[#9e9e9e] mb-1"
									style={{ fontFamily: "Space Mono" }}
								>
									PREDICTION MARKET
								</p>
								<p
									className="font-medium text-sm md:text-base"
									style={{ fontFamily: "Space Grotesk" }}
								>
									{currentMarket.question}
								</p>
							</div>
						</div>
					</div>

					{/* Outcome Selector */}
					<div
						className={`mb-6 transition-opacity duration-300 ${isTransitioning ? "opacity-50" : "opacity-100"
							}`}
					>
						<label
							className="block mb-3 font-medium text-sm md:text-base"
							style={{ fontFamily: "Space Grotesk" }}
						>
							Select Outcome
						</label>
						<div className="grid grid-cols-2 gap-3">
							{/* YES Card */}
							<button
								onClick={() => !isProcessing && setSelectedOutcome("YES")}
								disabled={isProcessing}
								className={`p-4 border-2 rounded-lg transition-all ${selectedOutcome === "YES"
										? "border-[#00b67a] bg-[#00b67a]/5"
										: "border-[#eaeaea] hover:border-[#00b67a]/30"
									}`}
							>
								<div className="flex items-center justify-between mb-2">
									<div className="flex items-center gap-2">
										<div className="w-8 h-8 rounded-full bg-[#00b67a] flex items-center justify-center">
											<TrendingUp
												size={16}
												className="text-white"
												strokeWidth={2.5}
											/>
										</div>
										<span
											className="font-bold"
											style={{ fontFamily: "Space Grotesk" }}
										>
											YES
										</span>
									</div>
									{selectedOutcome === "YES" && (
										<Check
											size={20}
											className="text-[#00b67a]"
											strokeWidth={3}
										/>
									)}
								</div>
								<div className="space-y-1">
									<div className="flex justify-between text-xs">
										<span style={{ fontFamily: "Space Mono", color: "#666" }}>
											Odds:
										</span>
										<span
											className="font-bold"
											style={{ fontFamily: "Space Mono" }}
										>
											{currentMarket.yesOdds.toFixed(2)}×
										</span>
									</div>
									<div className="flex justify-between text-xs">
										<span style={{ fontFamily: "Space Mono", color: "#666" }}>
											Pool:
										</span>
										<span
											className="font-bold"
											style={{ fontFamily: "Space Mono" }}
										>
											${(currentMarket.yesPoolSize / 1000).toFixed(1)}K
										</span>
									</div>
								</div>
							</button>

							{/* NO Card */}
							<button
								onClick={() => !isProcessing && setSelectedOutcome("NO")}
								disabled={isProcessing}
								className={`p-4 border-2 rounded-lg transition-all ${selectedOutcome === "NO"
										? "border-[#ef4444] bg-[#ef4444]/5"
										: "border-[#eaeaea] hover:border-[#ef4444]/30"
									}`}
							>
								<div className="flex items-center justify-between mb-2">
									<div className="flex items-center gap-2">
										<div className="w-8 h-8 rounded-full bg-[#ef4444] flex items-center justify-center">
											<TrendingDown
												size={16}
												className="text-white"
												strokeWidth={2.5}
											/>
										</div>
										<span
											className="font-bold"
											style={{ fontFamily: "Space Grotesk" }}
										>
											NO
										</span>
									</div>
									{selectedOutcome === "NO" && (
										<Check
											size={20}
											className="text-[#ef4444]"
											strokeWidth={3}
										/>
									)}
								</div>
								<div className="space-y-1">
									<div className="flex justify-between text-xs">
										<span style={{ fontFamily: "Space Mono", color: "#666" }}>
											Odds:
										</span>
										<span
											className="font-bold"
											style={{ fontFamily: "Space Mono" }}
										>
											{currentMarket.noOdds.toFixed(2)}×
										</span>
									</div>
									<div className="flex justify-between text-xs">
										<span style={{ fontFamily: "Space Mono", color: "#666" }}>
											Pool:
										</span>
										<span
											className="font-bold"
											style={{ fontFamily: "Space Mono" }}
										>
											${(currentMarket.noPoolSize / 1000).toFixed(1)}K
										</span>
									</div>
								</div>
							</button>
						</div>
					</div>

					{/* Bet Amount Input */}
					<div
						className={`mb-5 transition-opacity duration-300 ${isTransitioning ? "opacity-50" : "opacity-100"
							}`}
					>
						<label
							className="block mb-2 font-medium text-sm md:text-base"
							style={{ fontFamily: "Space Grotesk" }}
						>
							Amount (USDC)
						</label>
						<input
							type="number"
							value={betAmount}
							onChange={(e) => setBetAmount(e.target.value)}
							placeholder="0.00"
							disabled={isProcessing}
							className="w-full px-4 py-3 border-2 border-[#eaeaea] rounded-lg focus:outline-none focus:border-black transition-colors text-base md:text-lg"
							style={{ fontFamily: "Space Mono" }}
						/>
						<div className="flex gap-2 mt-2.5">
							{[10, 50, 100].map((amount) => (
								<button
									key={amount}
									onClick={() => addToBet(amount)}
									disabled={isProcessing}
									className="flex-1 px-3 py-2 border border-[#eaeaea] rounded-lg hover:border-black hover:bg-[#f5f5f5] transition-colors text-xs md:text-sm font-medium"
									style={{ fontFamily: "Space Mono" }}
								>
									+{amount}
								</button>
							))}
							<button
								onClick={() => setBetAmount("1000")}
								disabled={isProcessing}
								className="flex-1 px-3 py-2 border border-[#eaeaea] rounded-lg hover:border-black hover:bg-[#f5f5f5] transition-colors text-xs md:text-sm font-medium"
								style={{ fontFamily: "Space Mono" }}
							>
								Max
							</button>
						</div>
					</div>

					{/* Calculated Preview */}
					<div
						className={`mb-6 p-4 bg-[#fafafa] rounded-lg border border-[#eaeaea] transition-opacity duration-300 ${isTransitioning ? "opacity-50" : "opacity-100"
							}`}
					>
						<div className="flex justify-between mb-2.5">
							<span
								className="text-sm md:text-base"
								style={{ fontFamily: "Space Mono", color: "#666" }}
							>
								Potential Return:
							</span>
							<span
								className="font-bold text-sm md:text-base"
								style={{ fontFamily: "Space Mono" }}
							>
								{potentialReturn} USDC
							</span>
						</div>
						<div className="flex justify-between">
							<span
								className="text-xs md:text-sm"
								style={{ fontFamily: "Space Mono", color: "#999" }}
							>
								Fee (1.0%):
							</span>
							<span
								className="text-xs md:text-sm"
								style={{ fontFamily: "Space Mono", color: "#999" }}
							>
								{fee} USDC
							</span>
						</div>
					</div>

					{/* Action Button */}
					<button
						onClick={handlePlaceBet}
						disabled={
							isProcessing ||
							!selectedOutcome ||
							!betAmount ||
							parseFloat(betAmount) <= 0
						}
						className="w-full py-3 md:py-3.5 bg-white text-black border-2 border-black rounded-lg font-medium hover:bg-black hover:text-white transition-colors disabled:bg-[#f5f5f5] disabled:border-[#ccc] disabled:text-[#999] disabled:cursor-not-allowed text-center text-sm md:text-base"
						style={{ fontFamily: "Space Grotesk" }}
					>
						{txStatus === "confirming" ? (
							<span className="flex items-center justify-center gap-2">
								<span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
								<span>Confirming in wallet...</span>
							</span>
						) : txStatus === "confirmed" ? (
							<span className="flex items-center justify-center gap-2 text-[#00b67a]">
								<Check size={20} strokeWidth={3} />
								<span>Transaction Confirmed</span>
							</span>
						) : (
							"Place Bet"
						)}
					</button>
				</div>
			</div>
		</div>
	);
}
