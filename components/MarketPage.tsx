"use client";
import { BinaryMarket } from "@/lib/data";
import { getAllMarkets } from "@/dal/market";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AgentLogoWrapper } from "./AgentLogoWrapper";
import { MarketTypeTag } from "./MarketTypeTags";
import { MetricsBreakdown } from "./MetricsBreakdown";
import { MarketDataTabs } from "./MarketDataTabs";
import { MarketInfoSection } from "./MarketInfoSection";
import { UpcomingMarketPanel } from "./UpcomingMarketPanel";
import { MarketResolutionPanel } from "./MarketResolutionPanel";
import { BettingWidget } from "./BettingWidget";
import { FloatingBetButton } from "./FloatingBetButton";
import { ChatModal } from "./ChatModal";
import { BettingModal } from "./BettingModal";

const onAgentClick = (agentId: string) => {};
const onPlaceBet = () => {};
const onMarketSwipe = (marketId: string) => {};

export const MarketPage = ({
	selectedMarketId,
	initialMarket,
}: {
	selectedMarketId: string;
	initialMarket?: BinaryMarket;
}) => {
	const [isBettingModalOpen, setIsBettingModalOpen] = useState(false);
	const [preSelectedOutcome, setPreSelectedOutcome] = useState<
		"YES" | "NO" | undefined
	>(undefined);
	const [showSwipeHint, setShowSwipeHint] = useState(true);
	const [isTransitioning, setIsTransitioning] = useState(false);
	const [isChatModalOpen, setIsChatModalOpen] = useState(false);
	const [markets, setMarkets] = useState<BinaryMarket[]>(
		initialMarket ? [initialMarket] : []
	);
	const [isLoading, setIsLoading] = useState(!initialMarket);
	const touchStartX = useRef<number>(0);
	const touchEndX = useRef<number>(0);
	const containerRef = useRef<HTMLDivElement>(null);

	// Fetch all markets for navigation
	useEffect(() => {
		async function fetchMarkets() {
			try {
				const allMarkets = await getAllMarkets();
				setMarkets(allMarkets);
			} catch (error) {
				console.error("Failed to fetch markets:", error);
			} finally {
				setIsLoading(false);
			}
		}
		if (!initialMarket) {
			fetchMarkets();
		} else {
			// If we have an initial market, still fetch all markets in the background
			fetchMarkets();
		}
	}, [initialMarket]);

	// Get current market index
	const currentMarketIndex = markets.findIndex(
		(m) => m.id === selectedMarketId
	);
	const currentMarket = currentMarketIndex >= 0 
		? markets[currentMarketIndex] 
		: initialMarket || markets[0];

	// Hide swipe hint after 3 seconds
	useEffect(() => {
		const timer = setTimeout(() => {
			setShowSwipeHint(false);
		}, 4000);
		return () => clearTimeout(timer);
	}, []);

	// Swipe detection handlers
	const handleTouchStart = (e: React.TouchEvent) => {
		if (window.innerWidth >= 768) return; // Only on mobile
		touchStartX.current = e.touches[0].clientX;
	};

	const handleTouchMove = (e: React.TouchEvent) => {
		if (window.innerWidth >= 768) return;
		touchEndX.current = e.touches[0].clientX;
	};

	const handleTouchEnd = () => {
		if (window.innerWidth >= 768) return;

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
	};

	// Show loading state if no market is available
	if (isLoading || !currentMarket) {
		return (
			<div className="flex items-center justify-center h-full">
				<p
					className="text-[#9e9e9e] text-lg"
					style={{ fontFamily: "Space Grotesk" }}
				>
					Loading market...
				</p>
			</div>
		);
	}

	return (
		<div
			className="flex flex-col h-full"
			ref={containerRef}
			onTouchStart={handleTouchStart}
			onTouchMove={handleTouchMove}
			onTouchEnd={handleTouchEnd}
		>
			{/* Swipe Helper - Mobile Only */}
			{showSwipeHint && (
				<div className="md:hidden fixed top-20 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
					<div
						className="bg-black text-white px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2 text-xs animate-fadeIn"
						style={{ fontFamily: "Space Mono" }}
					>
						<ChevronLeft size={16} className="animate-pulse" />
						<span>Swipe to browse markets</span>
						<ChevronRight size={16} className="animate-pulse" />
					</div>
				</div>
			)}

			{/* Market Counter - Mobile Only */}
			<div className="md:hidden border-b border-[#eaeaea]">
				<div className="px-3 pt-3 pb-2 flex items-center justify-between">
					<button
						onClick={() => navigateMarket("prev")}
						className="p-2 hover:bg-[#f5f5f5] rounded-lg transition-colors"
						aria-label="Previous market"
					>
						<ChevronLeft size={20} />
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
					>
						<ChevronRight size={20} />
					</button>
				</div>

				{/* Pagination Dots */}
				<div className="flex items-center justify-center gap-1.5 pb-3">
					{markets.map((market, index) => (
						<button
							key={market.id}
							onClick={() => onMarketSwipe && onMarketSwipe(market.id)}
							className={`h-1.5 rounded-full transition-all ${
								index === currentMarketIndex
									? "w-6 bg-black"
									: "w-1.5 bg-[#e0e0e0] hover:bg-[#c0c0c0]"
							}`}
							aria-label={`Go to ${market.question}`}
						/>
					))}
				</div>
			</div>

			{/* Main Content */}
			<div
				className="flex-1 flex flex-col lg:flex-row gap-3 md:gap-5 p-3 md:p-6 lg:p-8 max-w-[1800px] mx-auto w-full transition-opacity duration-300 overflow-y-auto lg:overflow-hidden pb-24 md:pb-6"
				style={{
					opacity: isTransitioning ? 0.5 : 1,
				}}
			>
				{/* Left: Performance Graph */}
				<div className="flex-1 border border-[#eaeaea] rounded-xl p-3 md:p-6 bg-white flex flex-col overflow-hidden lg:h-full min-h-0">
					{/* Market Title - Desktop Only */}
					<div className="hidden md:block mb-5 flex-shrink-0">
						<div className="flex items-start gap-3 pb-4 border-b border-[#eaeaea]">
							<div className="flex-shrink-0">
								<div
									className="cursor-pointer transition-transform hover:scale-105"
									onClick={() => onAgentClick(currentMarket.agent.id)}
								>
									<AgentLogoWrapper
										agentId={currentMarket.agent.id}
										size="small"
									/>
								</div>
							</div>
							<div className="flex-1 min-w-0">
								<div className="flex items-center gap-2 mb-2">
									<MarketTypeTag
										emoji={currentMarket.marketTag.emoji}
										label={currentMarket.marketTag.label}
										color={currentMarket.marketTag.color}
									/>
									<span
										className={`px-2 py-0.5 rounded text-[0.625rem] uppercase tracking-wider font-bold ${
											currentMarket.status === "LIVE"
												? "bg-[#00b67a] text-white"
												: currentMarket.status === "UPCOMING"
												? "bg-[#F59E0B] text-white"
												: "bg-[#9e9e9e] text-white"
										}`}
										style={{ fontFamily: "Space Mono" }}
									>
										{currentMarket.status}
									</span>
								</div>
								<div className="flex items-center gap-2 mb-1">
									<span
										className="text-xs font-medium"
										style={{
											fontFamily: "Space Mono",
											color: currentMarket.agent.color,
										}}
									>
										{currentMarket.agent.name}
									</span>
								</div>
								<h2
									className="text-lg font-bold leading-snug"
									style={{ fontFamily: "Space Grotesk" }}
								>
									{currentMarket.question}
								</h2>
							</div>
						</div>
					</div>

					{/* Scrollable Content Area */}
					<div className="flex-1 overflow-y-auto min-h-0 -mr-1 pr-1">
						{/* Metrics Breakdown - if market has metrics */}
						{currentMarket.metrics && currentMarket.metrics.length > 0 && (
							<div className="mb-4 md:mb-5">
								<MetricsBreakdown metrics={currentMarket.metrics} />
							</div>
						)}

						{/* Market Data Tabs (includes Performance Graph, Performance Data, Trade Feed) */}
						<div className="mb-4 md:mb-5">
							<MarketDataTabs market={currentMarket} />
						</div>

						{/* Market Info Section */}
						<MarketInfoSection market={currentMarket} />
					</div>

					{/* Mobile Status Panels (Upcoming/Resolved only) */}
					<div className="lg:hidden mt-3">
						{currentMarket.status === "UPCOMING" && (
							<UpcomingMarketPanel
								agent={currentMarket.agent}
								timeRemaining={currentMarket.timeRemaining}
								onAgentClick={onAgentClick}
							/>
						)}

						{currentMarket.status === "RESOLVED" && currentMarket.outcome && (
							<MarketResolutionPanel
								outcome={currentMarket.outcome}
								finalYesProb={currentMarket.finalYesProb || 50}
								topWinners={currentMarket.topWinners}
							/>
						)}
					</div>
				</div>

				{/* Right: Betting Widget / Resolution / Upcoming + Trade Feed - Desktop Only */}
				<div className="hidden lg:flex w-full lg:w-[400px] flex-col gap-3 md:gap-5 lg:h-full">
					{/* Dynamic Panel Based on Market Status */}
					<div className="flex-shrink-0">
						{currentMarket.status === "LIVE" && (
							<BettingWidget 
								onPlaceBet={() => setIsBettingModalOpen(true)} 
								market={currentMarket}
							/>
						)}

						{currentMarket.status === "UPCOMING" && (
							<UpcomingMarketPanel
								agent={currentMarket.agent}
								timeRemaining={currentMarket.timeRemaining}
								onAgentClick={onAgentClick}
							/>
						)}

						{currentMarket.status === "RESOLVED" && currentMarket.outcome && (
							<MarketResolutionPanel
								outcome={currentMarket.outcome}
								finalYesProb={currentMarket.finalYesProb || 50}
								topWinners={currentMarket.topWinners}
							/>
						)}
					</div>
				</div>
			</div>

			{/* Footer - Hidden on mobile for LIVE markets */}
			<div
				className={`border-t border-[#eaeaea] px-3 md:px-6 lg:px-8 py-3 md:py-5 mb-safe ${
					currentMarket.status === "LIVE" ? "hidden lg:block" : ""
				}`}
			>
				<p
					className="text-center text-[#9e9e9e] font-medium text-[0.625rem] md:text-xs"
					style={{ fontFamily: "Space Mono" }}
				>
					{currentMarket.question}
				</p>
			</div>

			{/* Floating Bet & Chat Buttons - Mobile Only for LIVE markets */}
			{currentMarket.status === "LIVE" && (
				<FloatingBetButton
					onPlaceBet={onPlaceBet}
					onOpenChat={() => setIsChatModalOpen(true)}
				/>
			)}

			{/* Chat Modal */}
			{isChatModalOpen && (
				<ChatModal
					agentName={currentMarket.agent.name}
					agentAvatar={currentMarket.agent.avatar}
					agentColor={currentMarket.agent.color}
					onClose={() => setIsChatModalOpen(false)}
				/>
			)}

			<BettingModal
				isOpen={isBettingModalOpen}
				onClose={() => {
					setIsBettingModalOpen(false);
					setPreSelectedOutcome(undefined);
				}}
				selectedMarketId={selectedMarketId}
				//   onMarketSwipe={handleMarketSwipe}
				preSelectedOutcome={preSelectedOutcome}
				//   onAgentClick={setSelectedAgentId}
			/>
		</div>
	);
};
