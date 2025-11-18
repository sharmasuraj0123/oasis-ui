import { useState } from "react";
import { X, TrendingUp, TrendingDown, ExternalLink } from "lucide-react";
import {
	Agent,
	recentTrades,
	performanceData,
	binaryMarkets,
} from "../lib/data";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";
import { AgentLogoWrapper } from "./AgentLogoWrapper";
import { MarketTypeTag } from "./MarketTypeTags";

interface AgentPageProps {
	agent: Agent;
	onClose: () => void;
	onMarketClick?: (marketId: string) => void;
}

export function AgentPageComponent({
	agent,
	onClose,
	onMarketClick,
}: AgentPageProps) {
	const [activeTab, setActiveTab] = useState<"overview" | "trades" | "markets">(
		"overview"
	);

	const agentTrades = recentTrades.filter((t) => t.agentId === agent.id);
	const agentPerformanceData = performanceData.map((d) => ({
		timestamp: d.timestamp,
		value: d[agent.id as keyof typeof d] as number,
	}));

	// Filter markets where this agent is participating
	const agentMarkets = binaryMarkets.filter(
		(market) => market.agent.id === agent.id
	);

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-4 bg-white/30 backdrop-blur-sm">
			<div
				className="relative w-full max-w-4xl max-h-[90vh] bg-white border-2 border-black rounded-xl overflow-hidden flex flex-col"
				style={{ boxShadow: "0 20px 60px rgba(0, 0, 0, 0.25)" }}
				onClick={(e) => e.stopPropagation()}
			>
				{/* Header */}
				<div className="flex items-center justify-between p-4 md:p-7 border-b border-[#eaeaea]">
					<div className="flex items-center gap-3 md:gap-5 min-w-0 flex-1">
						<div className="flex-shrink-0">
							<AgentLogoWrapper agentId={agent.id} size="medium" />
						</div>
						<div className="min-w-0 flex-1">
							<h2
								className="font-bold truncate"
								style={{
									fontFamily: "Space Grotesk",
									fontSize: "clamp(1rem, 3vw, 1.25rem)",
								}}
							>
								{agent.name}
							</h2>
							<p
								className="text-[#9e9e9e] font-medium mt-0.5 md:mt-1 truncate"
								style={{ fontFamily: "Space Mono", fontSize: "0.75rem" }}
							>
								{agent.team}
							</p>
						</div>
					</div>

					<div className="flex items-center gap-2 md:gap-8 flex-shrink-0">
						<div className="text-right hidden sm:block">
							<div
								className="text-[#9e9e9e] uppercase tracking-wider font-medium mb-1.5"
								style={{
									fontFamily: "Space Mono",
									fontSize: "0.625rem",
									letterSpacing: "0.05em",
								}}
							>
								Current ROI
							</div>
							<div
								className={`flex items-center gap-1.5 font-bold ${
									agent.currentROI >= 0 ? "text-[#00b67a]" : "text-[#e24a3b]"
								}`}
								style={{ fontFamily: "Space Grotesk", fontSize: "1.25rem" }}
							>
								{agent.currentROI >= 0 ? (
									<TrendingUp size={20} />
								) : (
									<TrendingDown size={20} />
								)}
								{agent.currentROI >= 0 ? "+" : ""}
								{agent.currentROI}%
							</div>
						</div>

						<button
							onClick={onClose}
							className="p-2 md:p-2.5 hover:bg-[#f5f5f5] rounded-lg transition-colors flex-shrink-0"
						>
							<X size={20} className="md:w-[22px] md:h-[22px]" />
						</button>
					</div>
				</div>

				{/* Tabs */}
				<div className="flex border-b border-[#eaeaea] overflow-x-auto">
					<button
						onClick={() => setActiveTab("overview")}
						className={`px-4 md:px-7 py-3 md:py-4 uppercase tracking-wider font-medium transition-colors whitespace-nowrap ${
							activeTab === "overview"
								? "border-b-2 border-black text-black"
								: "text-[#9e9e9e] hover:text-black"
						}`}
						style={{
							fontFamily: "Space Mono",
							fontSize: "0.75rem",
							letterSpacing: "0.05em",
						}}
					>
						Overview
					</button>
					<button
						onClick={() => setActiveTab("trades")}
						className={`px-4 md:px-7 py-3 md:py-4 uppercase tracking-wider font-medium transition-colors whitespace-nowrap ${
							activeTab === "trades"
								? "border-b-2 border-black text-black"
								: "text-[#9e9e9e] hover:text-black"
						}`}
						style={{
							fontFamily: "Space Mono",
							fontSize: "0.75rem",
							letterSpacing: "0.05em",
						}}
					>
						Trade Log
					</button>
					<button
						onClick={() => setActiveTab("markets")}
						className={`px-4 md:px-7 py-3 md:py-4 uppercase tracking-wider font-medium transition-colors whitespace-nowrap ${
							activeTab === "markets"
								? "border-b-2 border-black text-black"
								: "text-[#9e9e9e] hover:text-black"
						}`}
						style={{
							fontFamily: "Space Mono",
							fontSize: "0.75rem",
							letterSpacing: "0.05em",
						}}
					>
						Markets
					</button>
				</div>

				{/* Content */}
				<div className="flex-1 overflow-y-auto p-4 md:p-7">
					{activeTab === "overview" ? (
						<div className="space-y-8">
							{/* Team Info */}
							<div>
								<h3
									className="mb-3 font-semibold"
									style={{ fontFamily: "Space Grotesk", fontSize: "1rem" }}
								>
									Builder Team
								</h3>
								<div className="flex gap-2.5">
									{agent.teamMembers.map((member, i) => (
										<span
											key={i}
											className="px-3.5 py-2 bg-[#fafafa] border border-[#eaeaea] rounded-lg font-medium"
											style={{
												fontFamily: "Space Mono",
												fontSize: "0.8125rem",
											}}
										>
											{member}
										</span>
									))}
								</div>
							</div>

							{/* Agent Info */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<div
										className="text-[#9e9e9e] uppercase tracking-wider mb-2.5 font-medium"
										style={{
											fontFamily: "Space Mono",
											fontSize: "0.6875rem",
											letterSpacing: "0.05em",
										}}
									>
										Model
									</div>
									<div
										className="font-medium"
										style={{ fontFamily: "Space Mono", fontSize: "0.8125rem" }}
									>
										{agent.model}
									</div>
								</div>

								<div>
									<div
										className="text-[#9e9e9e] uppercase tracking-wider mb-2.5 font-medium"
										style={{
											fontFamily: "Space Mono",
											fontSize: "0.6875rem",
											letterSpacing: "0.05em",
										}}
									>
										Portfolio Value
									</div>
									<div
										className="font-semibold"
										style={{
											fontFamily: "Space Grotesk",
											fontSize: "0.875rem",
										}}
									>
										${agent.portfolioValue.toLocaleString()}
									</div>
								</div>

								<div className="md:col-span-2">
									<div
										className="text-[#9e9e9e] uppercase tracking-wider mb-2.5 font-medium"
										style={{
											fontFamily: "Space Mono",
											fontSize: "0.6875rem",
											letterSpacing: "0.05em",
										}}
									>
										Strategy
									</div>
									<div
										className="font-medium"
										style={{
											fontFamily: "Space Mono",
											fontSize: "0.8125rem",
											lineHeight: "1.6",
										}}
									>
										{agent.strategy}
									</div>
								</div>

								<div className="md:col-span-2">
									<div
										className="text-[#9e9e9e] uppercase tracking-wider mb-2.5 font-medium"
										style={{
											fontFamily: "Space Mono",
											fontSize: "0.6875rem",
											letterSpacing: "0.05em",
										}}
									>
										Description
									</div>
									<div
										className="font-medium"
										style={{
											fontFamily: "Space Mono",
											fontSize: "0.8125rem",
											lineHeight: "1.6",
										}}
									>
										{agent.bio}
									</div>
								</div>
							</div>

							{/* Performance Chart */}
							<div>
								<h3
									className="mb-4 font-semibold"
									style={{ fontFamily: "Space Grotesk", fontSize: "1rem" }}
								>
									Performance Chart
								</h3>
								<div className="h-64 border border-[#eaeaea] rounded-xl p-4">
									<ResponsiveContainer width="100%" height="100%">
										<LineChart data={agentPerformanceData}>
											<CartesianGrid strokeDasharray="0" stroke="#eaeaea" />
											<XAxis
												dataKey="timestamp"
												tickFormatter={(ts) =>
													new Date(ts).toLocaleDateString("en-US", {
														month: "short",
														day: "numeric",
													})
												}
												stroke="#9e9e9e"
												style={{
													fontFamily: "Space Mono",
													fontSize: "0.6875rem",
												}}
												tick={{ fill: "#9e9e9e" }}
											/>
											<YAxis
												tickFormatter={(value) =>
													`$${(value / 1000).toFixed(1)}k`
												}
												stroke="#9e9e9e"
												style={{
													fontFamily: "Space Mono",
													fontSize: "0.6875rem",
												}}
												tick={{ fill: "#9e9e9e" }}
											/>
											<Tooltip
												contentStyle={{
													backgroundColor: "white",
													border: "1px solid #000",
													borderRadius: "8px",
													fontFamily: "Space Mono",
													fontSize: "0.8125rem",
													padding: "8px 12px",
												}}
												formatter={(value: any) => `$${value.toFixed(2)}`}
												labelFormatter={(ts) => new Date(ts).toLocaleString()}
											/>
											<Line
												type="monotone"
												dataKey="value"
												stroke={agent.color}
												strokeWidth={1.5}
												dot={false}
											/>
										</LineChart>
									</ResponsiveContainer>
								</div>
							</div>
						</div>
					) : activeTab === "trades" ? (
						<div>
							<h3
								className="mb-5 font-semibold"
								style={{ fontFamily: "Space Grotesk", fontSize: "1rem" }}
							>
								Recent Trades
							</h3>

							{/* Mobile Card Layout */}
							<div className="md:hidden space-y-3">
								{agentTrades.map((trade) => (
									<div
										key={trade.id}
										className="border border-[#eaeaea] rounded-xl p-3"
									>
										<div className="flex items-center justify-between mb-3">
											<div className="flex items-center gap-2">
												<span
													className="font-medium"
													style={{
														fontFamily: "Space Mono",
														fontSize: "0.8125rem",
													}}
												>
													{trade.pair}
												</span>
												<span
													className={`uppercase px-2 py-0.5 rounded font-bold ${
														trade.action === "BUY"
															? "bg-[#00b67a] text-white"
															: "bg-[#e24a3b] text-white"
													}`}
													style={{
														fontFamily: "Space Mono",
														fontSize: "0.625rem",
														letterSpacing: "0.05em",
													}}
												>
													{trade.action}
												</span>
											</div>
											<span
												className="text-[#9e9e9e] font-medium"
												style={{
													fontFamily: "Space Mono",
													fontSize: "0.6875rem",
												}}
											>
												{new Date(trade.timestamp).toLocaleDateString("en-US", {
													month: "short",
													day: "numeric",
												})}
											</span>
										</div>

										<div className="grid grid-cols-3 gap-3">
											<div>
												<div
													className="text-[#9e9e9e] uppercase tracking-wider mb-1 font-medium"
													style={{
														fontFamily: "Space Mono",
														fontSize: "0.625rem",
														letterSpacing: "0.05em",
													}}
												>
													Size
												</div>
												<div
													className="font-medium"
													style={{
														fontFamily: "Space Mono",
														fontSize: "0.8125rem",
													}}
												>
													${trade.size.toFixed(2)}
												</div>
											</div>

											<div>
												<div
													className="text-[#9e9e9e] uppercase tracking-wider mb-1 font-medium"
													style={{
														fontFamily: "Space Mono",
														fontSize: "0.625rem",
														letterSpacing: "0.05em",
													}}
												>
													P&L
												</div>
												<div
													className={`font-semibold ${
														trade.pnl >= 0 ? "text-[#00b67a]" : "text-[#e24a3b]"
													}`}
													style={{
														fontFamily: "Space Mono",
														fontSize: "0.8125rem",
													}}
												>
													{trade.pnl >= 0 ? "+" : ""}${trade.pnl.toFixed(2)}
												</div>
											</div>

											<div>
												<div
													className="text-[#9e9e9e] uppercase tracking-wider mb-1 font-medium"
													style={{
														fontFamily: "Space Mono",
														fontSize: "0.625rem",
														letterSpacing: "0.05em",
													}}
												>
													P&L %
												</div>
												<div
													className={`font-semibold ${
														trade.pnlPercent >= 0
															? "text-[#00b67a]"
															: "text-[#e24a3b]"
													}`}
													style={{
														fontFamily: "Space Mono",
														fontSize: "0.8125rem",
													}}
												>
													{trade.pnlPercent >= 0 ? "+" : ""}
													{trade.pnlPercent.toFixed(2)}%
												</div>
											</div>
										</div>
									</div>
								))}
							</div>

							{/* Desktop Table Layout */}
							<div className="hidden md:block border border-[#eaeaea] rounded-xl overflow-hidden">
								<table className="w-full">
									<thead className="bg-[#fafafa]">
										<tr>
											<th
												className="px-5 py-3.5 text-left text-[#9e9e9e] uppercase tracking-wider font-medium"
												style={{
													fontFamily: "Space Mono",
													fontSize: "0.6875rem",
													letterSpacing: "0.05em",
												}}
											>
												Date
											</th>
											<th
												className="px-5 py-3.5 text-left text-[#9e9e9e] uppercase tracking-wider font-medium"
												style={{
													fontFamily: "Space Mono",
													fontSize: "0.6875rem",
													letterSpacing: "0.05em",
												}}
											>
												Pair
											</th>
											<th
												className="px-5 py-3.5 text-left text-[#9e9e9e] uppercase tracking-wider font-medium"
												style={{
													fontFamily: "Space Mono",
													fontSize: "0.6875rem",
													letterSpacing: "0.05em",
												}}
											>
												Action
											</th>
											<th
												className="px-5 py-3.5 text-right text-[#9e9e9e] uppercase tracking-wider font-medium"
												style={{
													fontFamily: "Space Mono",
													fontSize: "0.6875rem",
													letterSpacing: "0.05em",
												}}
											>
												Size
											</th>
											<th
												className="px-5 py-3.5 text-right text-[#9e9e9e] uppercase tracking-wider font-medium"
												style={{
													fontFamily: "Space Mono",
													fontSize: "0.6875rem",
													letterSpacing: "0.05em",
												}}
											>
												P&L
											</th>
											<th
												className="px-5 py-3.5 text-right text-[#9e9e9e] uppercase tracking-wider font-medium"
												style={{
													fontFamily: "Space Mono",
													fontSize: "0.6875rem",
													letterSpacing: "0.05em",
												}}
											>
												P&L %
											</th>
										</tr>
									</thead>
									<tbody>
										{agentTrades.map((trade) => (
											<tr key={trade.id} className="border-t border-[#eaeaea]">
												<td
													className="px-5 py-3.5 font-medium"
													style={{
														fontFamily: "Space Mono",
														fontSize: "0.8125rem",
													}}
												>
													{new Date(trade.timestamp).toLocaleDateString()}
												</td>
												<td
													className="px-5 py-3.5 font-medium"
													style={{
														fontFamily: "Space Mono",
														fontSize: "0.8125rem",
													}}
												>
													{trade.pair}
												</td>
												<td className="px-5 py-3.5">
													<span
														className={`uppercase px-2.5 py-1 rounded font-bold ${
															trade.action === "BUY"
																? "bg-[#00b67a] bg-opacity-10 text-[#00b67a]"
																: "bg-[#e24a3b] bg-opacity-10 text-[#e24a3b]"
														}`}
														style={{
															fontFamily: "Space Mono",
															fontSize: "0.6875rem",
															letterSpacing: "0.05em",
														}}
													>
														{trade.action}
													</span>
												</td>
												<td
													className="px-5 py-3.5 text-right font-medium"
													style={{
														fontFamily: "Space Mono",
														fontSize: "0.8125rem",
													}}
												>
													${trade.size.toFixed(2)}
												</td>
												<td
													className={`px-5 py-3.5 text-right font-semibold ${
														trade.pnl >= 0 ? "text-[#00b67a]" : "text-[#e24a3b]"
													}`}
													style={{
														fontFamily: "Space Mono",
														fontSize: "0.8125rem",
													}}
												>
													{trade.pnl >= 0 ? "+" : ""}${trade.pnl.toFixed(2)}
												</td>
												<td
													className={`px-5 py-3.5 text-right font-semibold ${
														trade.pnlPercent >= 0
															? "text-[#00b67a]"
															: "text-[#e24a3b]"
													}`}
													style={{
														fontFamily: "Space Mono",
														fontSize: "0.8125rem",
													}}
												>
													{trade.pnlPercent >= 0 ? "+" : ""}
													{trade.pnlPercent.toFixed(2)}%
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					) : (
						<div>
							<h3
								className="mb-5 font-semibold"
								style={{ fontFamily: "Space Grotesk", fontSize: "1rem" }}
							>
								Markets Featuring {agent.name}
							</h3>

							{agentMarkets.length === 0 ? (
								<div className="border border-[#eaeaea] rounded-xl p-8 text-center">
									<p
										className="text-[#9e9e9e] font-medium"
										style={{ fontFamily: "Space Mono", fontSize: "0.8125rem" }}
									>
										No active markets found for this agent.
									</p>
								</div>
							) : (
								<div className="space-y-3 md:space-y-4">
									{agentMarkets.map((market) => (
										<div
											key={market.id}
											onClick={() => {
												if (onMarketClick) {
													onMarketClick(market.id);
													onClose();
												}
											}}
											className="border border-[#eaeaea] rounded-xl p-4 md:p-5 hover:border-black transition-all cursor-pointer group"
										>
											<div className="flex items-start justify-between gap-3 mb-3">
												<div className="flex-1 min-w-0">
													<div className="flex items-center gap-2 mb-2 flex-wrap">
														<MarketTypeTag
															emoji={market.marketTag.emoji}
															label={market.marketTag.label}
															color={market.marketTag.color}
														/>
														<span
															className={`uppercase px-2.5 py-1 rounded font-bold whitespace-nowrap ${
																market.status === "LIVE"
																	? "bg-[#00b67a] bg-opacity-10 text-[#00b67a]"
																	: market.status === "UPCOMING"
																	? "bg-[#3B82F6] bg-opacity-10 text-[#3B82F6]"
																	: "bg-[#9e9e9e] bg-opacity-10 text-[#9e9e9e]"
															}`}
															style={{
																fontFamily: "Space Mono",
																fontSize: "0.625rem",
																letterSpacing: "0.05em",
															}}
														>
															{market.status}
														</span>
													</div>
													<h4
														className="font-semibold mb-2 group-hover:text-black transition-colors"
														style={{
															fontFamily: "Space Grotesk",
															fontSize: "0.9375rem",
															lineHeight: "1.4",
														}}
													>
														{market.question}
													</h4>
												</div>
												<ExternalLink
													size={16}
													className="text-[#9e9e9e] group-hover:text-black transition-colors flex-shrink-0 mt-1"
												/>
											</div>

											<div className="grid grid-cols-2 gap-3 md:gap-4">
												<div>
													<div
														className="text-[#9e9e9e] uppercase tracking-wider mb-1 font-medium"
														style={{
															fontFamily: "Space Mono",
															fontSize: "0.625rem",
															letterSpacing: "0.05em",
														}}
													>
														Yes Odds
													</div>
													<div
														className="font-semibold"
														style={{
															fontFamily: "Space Grotesk",
															fontSize: "0.875rem",
														}}
													>
														{market.yesOdds.toFixed(2)}x
													</div>
												</div>

												<div>
													<div
														className="text-[#9e9e9e] uppercase tracking-wider mb-1 font-medium"
														style={{
															fontFamily: "Space Mono",
															fontSize: "0.625rem",
															letterSpacing: "0.05em",
														}}
													>
														No Odds
													</div>
													<div
														className="font-semibold"
														style={{
															fontFamily: "Space Grotesk",
															fontSize: "0.875rem",
														}}
													>
														{market.noOdds.toFixed(2)}x
													</div>
												</div>

												<div>
													<div
														className="text-[#9e9e9e] uppercase tracking-wider mb-1 font-medium"
														style={{
															fontFamily: "Space Mono",
															fontSize: "0.625rem",
															letterSpacing: "0.05em",
														}}
													>
														Total Volume
													</div>
													<div
														className="font-semibold"
														style={{
															fontFamily: "Space Grotesk",
															fontSize: "0.875rem",
														}}
													>
														${(market.totalVolume / 1000).toFixed(1)}k
													</div>
												</div>

												<div>
													<div
														className="text-[#9e9e9e] uppercase tracking-wider mb-1 font-medium"
														style={{
															fontFamily: "Space Mono",
															fontSize: "0.625rem",
															letterSpacing: "0.05em",
														}}
													>
														{market.status === "LIVE"
															? "Probability"
															: market.status === "RESOLVED"
															? "Outcome"
															: "Status"}
													</div>
													<div
														className="font-semibold"
														style={{
															fontFamily: "Space Grotesk",
															fontSize: "0.875rem",
														}}
													>
														{market.status === "LIVE"
															? `${market.currentYesProb}%`
															: market.status === "RESOLVED"
															? market.outcome
															: "Upcoming"}
													</div>
												</div>
											</div>
										</div>
									))}
								</div>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
