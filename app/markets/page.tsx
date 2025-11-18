"use client";
import { AgentLogoWrapper } from "@/components/AgentLogoWrapper";
import { BettingModal } from "@/components/BettingModal";
import { MarketTypeTag } from "@/components/MarketTypeTags";
import { BinaryMarket, binaryMarkets, MarketType } from "@/lib/data";
import {
	ChevronRight,
	Filter,
	Search,
	TrendingDown,
	TrendingUp,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { use, useState } from "react";

const onMarketClick = (marketId: string) => {};
const onPlaceBet = (marketId: string, outcome: "YES" | "NO") => {};
const onAgentClick = (agentId: string) => {};

const MarketsPage = () => {
	const [filterStatus, setFilterStatus] = useState<
		"ALL" | "LIVE" | "UPCOMING" | "RESOLVED"
	>("ALL");
	const [filterMarketType, setFilterMarketType] = useState<"ALL" | MarketType>(
		"ALL"
	);
	const [sortBy, setSortBy] = useState<"volume" | "ending" | "probability">(
		"volume"
	);
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedMarketId, setSelectedMarketId] = useState<string>("market-1");
	const [preSelectedOutcome, setPreSelectedOutcome] = useState<
		"YES" | "NO" | undefined
	>(undefined);
	const [isBettingModalOpen, setIsBettingModalOpen] = useState(false);

	const router = useRouter();

	// Filter and sort markets
	const filteredMarkets = binaryMarkets
		.filter((market) => {
			if (filterStatus !== "ALL" && market.status !== filterStatus)
				return false;
			if (filterMarketType !== "ALL" && market.marketType !== filterMarketType)
				return false;
			if (
				searchQuery &&
				!market.question.toLowerCase().includes(searchQuery.toLowerCase())
			)
				return false;
			return true;
		})
		.sort((a, b) => {
			if (sortBy === "volume") return b.totalVolume - a.totalVolume;
			if (sortBy === "ending") return a.timeRemaining - b.timeRemaining;
			// Probability spread
			const spreadA = Math.abs((a.currentYesProb || 50) - 50);
			const spreadB = Math.abs((b.currentYesProb || 50) - 50);
			return spreadB - spreadA;
		});

	const formatTimeRemaining = (ms: number) => {
		if (ms <= 0) return "Ended";
		const days = Math.floor(ms / (24 * 60 * 60 * 1000));
		const hours = Math.floor((ms % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
		if (days > 0) return `${days}d ${hours}h left`;
		return `${hours}h left`;
	};

	const getStatusBadge = (status: BinaryMarket["status"]) => {
		switch (status) {
			case "LIVE":
				return { bg: "bg-[#00b67a]", text: "text-white", label: "LIVE" };
			case "UPCOMING":
				return { bg: "bg-[#F59E0B]", text: "text-white", label: "UPCOMING" };
			case "RESOLVED":
				return { bg: "bg-[#9e9e9e]", text: "text-white", label: "RESOLVED" };
		}
	};

	return (
		<div className="flex flex-col h-full">
			<div className="flex-1 p-3 md:p-6 lg:p-8 max-w-[1800px] mx-auto w-full">
				{/* Hero Section */}
				<div className="mb-6 md:mb-8">
					<h1
						className="mb-3"
						style={{
							fontFamily: "Space Grotesk",
							fontSize: "36px",
							lineHeight: "40px",
							fontWeight: "normal",
						}}
					>
						Welcome to Oasis
					</h1>
					<p
						className="text-[#666666] max-w-3xl"
						style={{
							fontFamily: "Space Mono",
							fontSize: "16px",
							lineHeight: "24px",
						}}
					>
						Bet on verifiable intelligence.
					</p>
				</div>

				{/* Filter Bar */}
				<div className="mb-6 flex flex-col md:flex-row gap-3 md:gap-4">
					{/* Search */}
					<div className="flex-1 relative">
						<Search
							className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9e9e9e]"
							size={16}
						/>
						<input
							type="text"
							placeholder="Search prediction markets..."
							//   value={searchQuery}
							//   onChange={(e) => setSearchQuery(e.target.value)}
							className="w-full pl-10 pr-4 py-[10px] border border-[#eaeaea] rounded-[10px] focus:outline-none focus:border-black transition-colors"
							style={{ fontFamily: "Space Mono", fontSize: "14px" }}
						/>
					</div>

					{/* Status Filter */}
					<div className="flex items-center gap-2">
						<Filter size={16} className="text-[#9e9e9e]" />
						<select
							//   value={filterStatus}
							//   onChange={(e) => setFilterStatus(e.target.value as any)}
							className="px-3 py-[10px] border border-[#eaeaea] rounded-[10px] focus:outline-none focus:border-black transition-colors cursor-pointer"
							style={{ fontFamily: "Space Mono", fontSize: "13px" }}
						>
							<option value="ALL">All Markets</option>
							<option value="LIVE">Live</option>
							<option value="UPCOMING">Upcoming</option>
							<option value="RESOLVED">Resolved</option>
						</select>
					</div>

					{/* Sort */}
					<select
						// value={sortBy}
						// onChange={(e) => setSortBy(e.target.value as any)}
						className="px-3 py-[10px] border border-[#eaeaea] rounded-[10px] focus:outline-none focus:border-black transition-colors cursor-pointer"
						style={{ fontFamily: "Space Mono", fontSize: "13px" }}
					>
						<option value="volume">Sort by Volume</option>
						<option value="ending">Ending Soon</option>
						<option value="probability">Probability Spread</option>
					</select>
				</div>

				{/* Markets Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5 mb-8">
					{filteredMarkets.map((market) => {
						const statusBadge = getStatusBadge(market.status);
						const yesProb =
							market.status === "RESOLVED"
								? market.finalYesProb || 50
								: market.currentYesProb || 50;
						const noProb = 100 - yesProb;

						return (
							<div
								key={market.id}
								onClick={() => router.push(`/markets/${market.id}`)}
								className="border-2 border-[#eaeaea] bg-white hover:border-black hover:shadow-lg transition-all cursor-pointer group flex flex-col p-[22px]"
								style={{ borderRadius: "16.4px" }}
							>
								{/* Market Type Tag & Status */}
								<div className="flex items-center justify-between mb-3">
									<MarketTypeTag
										emoji={market.marketTag.emoji}
										label={market.marketTag.label}
										color={market.marketTag.color}
									/>
									<span
										className={`px-[10px] py-1 font-bold ${statusBadge.bg} ${statusBadge.text}`}
										style={{
											fontFamily: "Space Mono",
											fontSize: "10px",
											lineHeight: "16px",
											letterSpacing: "0.5px",
											textTransform: "uppercase",
											borderRadius: "6.8px",
										}}
									>
										{statusBadge.label}
									</span>
								</div>

								{/* Time Remaining */}
								<div className="mb-3">
									<span
										className="text-[#666666]"
										style={{
											fontFamily: "Space Mono",
											fontSize: "12px",
											lineHeight: "16px",
										}}
									>
										{formatTimeRemaining(market.timeRemaining)}
									</span>
								</div>

								{/* Agent Badge */}
								<div className="flex items-center gap-2 mb-3">
									<div
										className="cursor-pointer transition-transform hover:scale-105"
										onClick={(e) => {
											e.stopPropagation();
											if (onAgentClick) onAgentClick(market.agent.id);
										}}
									>
										<AgentLogoWrapper agentId={market.agent.id} size="small" />
									</div>
									<span
										className="font-medium"
										style={{
											fontFamily: "Space Mono",
											fontSize: "12px",
											lineHeight: "16px",
											color: market.agent.color,
										}}
									>
										{market.agent.name}
									</span>
								</div>

								{/* Market Question */}
								<h3
									className="mb-3 group-hover:text-black transition-colors"
									style={{
										fontFamily: "Space Grotesk",
										fontSize: "18px",
										lineHeight: "24.75px",
									}}
								>
									{market.question}
								</h3>

								{/* Description */}
								<p
									className="text-[#666666] mb-4 line-clamp-2"
									style={{
										fontFamily: "Space Mono",
										fontSize: "12px",
										lineHeight: "16px",
									}}
								>
									{market.description}
								</p>

								{/* YES/NO Probabilities */}
								<div className="space-y-2.5 mb-4">
									<div className="flex items-center gap-2">
										<div className="flex-1">
											<div className="flex items-center justify-between mb-1">
												<div className="flex items-center gap-1.5">
													<TrendingUp size={12} className="text-[#00b67a]" />
													<span
														className="text-xs font-medium"
														style={{ fontFamily: "Space Mono" }}
													>
														YES
													</span>
												</div>
												<div className="flex items-center gap-2">
													<span
														className="text-[0.625rem] font-bold text-[#00b67a]"
														style={{ fontFamily: "Space Mono" }}
													>
														{yesProb.toFixed(1)}%
													</span>
													<span
														className="text-xs font-bold"
														style={{ fontFamily: "Space Mono" }}
													>
														{market.yesOdds}×
													</span>
												</div>
											</div>
											<div className="h-1.5 bg-[#f0f0f0] rounded-full overflow-hidden">
												<div
													className="h-full rounded-full transition-all bg-[#00b67a]"
													style={{ width: `${yesProb}%` }}
												/>
											</div>
										</div>
									</div>
									<div className="flex items-center gap-2">
										<div className="flex-1">
											<div className="flex items-center justify-between mb-1">
												<div className="flex items-center gap-1.5">
													<TrendingDown size={12} className="text-[#e24a3b]" />
													<span
														className="text-xs font-medium"
														style={{ fontFamily: "Space Mono" }}
													>
														NO
													</span>
												</div>
												<div className="flex items-center gap-2">
													<span
														className="text-[0.625rem] font-bold text-[#e24a3b]"
														style={{ fontFamily: "Space Mono" }}
													>
														{noProb.toFixed(1)}%
													</span>
													<span
														className="text-xs font-bold"
														style={{ fontFamily: "Space Mono" }}
													>
														{market.noOdds}×
													</span>
												</div>
											</div>
											<div className="h-1.5 bg-[#f0f0f0] rounded-full overflow-hidden">
												<div
													className="h-full rounded-full transition-all bg-[#e24a3b]"
													style={{ width: `${noProb}%` }}
												/>
											</div>
										</div>
									</div>
								</div>

								{/* Market Start Countdown for UPCOMING */}
								{market.status === "UPCOMING" && (
									<div className="mb-4 p-2.5 bg-[#FEF3C7] border border-[#F59E0B] rounded-lg">
										<p
											className="text-[0.625rem] text-center font-medium"
											style={{ fontFamily: "Space Mono", color: "#92400E" }}
										>
											Market starts in:{" "}
											{formatTimeRemaining(market.timeRemaining)}
										</p>
									</div>
								)}

								{/* Resolution Info for RESOLVED */}
								{market.status === "RESOLVED" && market.outcome && (
									<div className="mb-4 p-3 bg-[#DCFCE7] border border-[#10B981] rounded-lg">
										<div className="flex items-center justify-between mb-1">
											<span
												className="text-[0.625rem] uppercase tracking-wider text-[#065F46]"
												style={{ fontFamily: "Space Mono" }}
											>
												Result
											</span>
											<span
												className="text-[0.625rem] font-bold text-[#065F46]"
												style={{ fontFamily: "Space Mono" }}
											>
												RESOLVED
											</span>
										</div>
										<p
											className="text-sm font-bold mb-0.5"
											style={{
												fontFamily: "Space Grotesk",
												color: market.outcome === "YES" ? "#00b67a" : "#e24a3b",
											}}
										>
											{market.outcome}
										</p>
										<p
											className="text-[0.625rem] text-[#065F46]"
											style={{ fontFamily: "Space Mono" }}
										>
											Final probability: {market.finalYesProb?.toFixed(1)}%
										</p>
									</div>
								)}

								{/* Stats */}
								<div className="pt-3 border-t border-[#eaeaea] mb-4">
									<div className="grid grid-cols-2 gap-3">
										<div>
											<p
												className="text-[0.625rem] text-[#9e9e9e] mb-0.5 uppercase tracking-wider"
												style={{ fontFamily: "Space Mono" }}
											>
												Volume
											</p>
											<p
												className="text-xs font-bold"
												style={{ fontFamily: "Space Mono" }}
											>
												${market.totalVolume.toLocaleString()}
											</p>
										</div>
										<div>
											<p
												className="text-[0.625rem] text-[#9e9e9e] mb-0.5 uppercase tracking-wider"
												style={{ fontFamily: "Space Mono" }}
											>
												Pool Split
											</p>
											<p
												className="text-xs font-bold"
												style={{ fontFamily: "Space Mono" }}
											>
												{(
													(market.yesPoolSize / market.totalVolume) *
													100
												).toFixed(0)}
												% /{" "}
												{(
													(market.noPoolSize / market.totalVolume) *
													100
												).toFixed(0)}
												%
											</p>
										</div>
									</div>
								</div>

								{/* CTA Buttons */}
								{market.status === "LIVE" ? (
									<div className="mt-auto grid grid-cols-2 gap-3">
										<button
											onClick={(e) => {
												e.stopPropagation();
												setSelectedMarketId(market.id);
												setPreSelectedOutcome("YES");
												setIsBettingModalOpen(true);
											}}
											className="py-[10px] border-2 border-[#00b67a] bg-white text-[#00b67a] rounded-[10px] hover:bg-[#00b67a] hover:text-white transition-colors font-bold flex items-center justify-center gap-1.5"
											style={{
												fontFamily: "Space Mono",
												fontSize: "12px",
												lineHeight: "19.2px",
											}}
										>
											<TrendingUp size={14} strokeWidth={1.5} />
											<span>YES</span>
										</button>
										<button
											onClick={(e) => {
												e.stopPropagation();
												setSelectedMarketId(market.id);
												setPreSelectedOutcome("NO");
												setIsBettingModalOpen(true);
											}}
											className="py-[10px] border-2 border-[#e24a3b] bg-white text-[#e24a3b] rounded-[10px] hover:bg-[#e24a3b] hover:text-white transition-colors font-bold flex items-center justify-center gap-1.5"
											style={{
												fontFamily: "Space Mono",
												fontSize: "12px",
												lineHeight: "19.2px",
											}}
										>
											<TrendingDown size={14} strokeWidth={1.5} />
											<span>NO</span>
										</button>
									</div>
								) : (
									<button
										className="w-full mt-auto py-2.5 border-2 border-black rounded-lg hover:bg-black hover:text-white transition-colors font-bold flex items-center justify-center gap-2 group-hover:gap-3 group-hover:shadow-md"
										style={{ fontFamily: "Space Mono", fontSize: "0.75rem" }}
									>
										<span>VIEW MARKET</span>
										<ChevronRight size={14} />
									</button>
								)}
							</div>
						);
					})}
				</div>

				{/* Empty State */}
				{filteredMarkets.length === 0 && (
					<div className="text-center py-16">
						<p
							className="text-[#9e9e9e] text-lg mb-2"
							style={{ fontFamily: "Space Grotesk" }}
						>
							No markets found
						</p>
						<p
							className="text-[#9e9e9e] text-sm"
							style={{ fontFamily: "Space Mono" }}
						>
							Try adjusting your filters
						</p>
					</div>
				)}
			</div>
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

export default MarketsPage;
