"use client";
import { useState } from "react";
import { BinaryMarket, generateRecentTrades } from "../lib/data";
import {
	BarChart3,
	TrendingUp,
	MessageSquare,
	ArrowUpRight,
	ArrowDownRight,
} from "lucide-react";
import { PerformanceGraph } from "./PerformanceGraph";

interface MarketDataTabsProps {
	market: BinaryMarket;
}

type TabType = "probability" | "performance" | "feed";

export function MarketDataTabs({ market }: MarketDataTabsProps) {
	const [activeTab, setActiveTab] = useState<TabType>("probability");

	// Determine if trading is applicable for this market type
	const isTradingApplicable = market.marketType === "Agent Performance";
	const recentTrades = isTradingApplicable
		? generateRecentTrades(market.agent.name)
		: [];

	const tabs = [
		{
			id: "probability" as TabType,
			label: "Market Probability",
			icon: TrendingUp,
		},
		{
			id: "performance" as TabType,
			label: "Performance Data",
			icon: BarChart3,
		},
		{ id: "feed" as TabType, label: "Trade Feed", icon: MessageSquare },
	];

	const formatTime = (timestamp: number) => {
		const date = new Date(timestamp);
		const now = new Date();
		const diff = now.getTime() - date.getTime();
		const minutes = Math.floor(diff / 60000);

		if (minutes < 1) return "Just now";
		if (minutes < 60) return `${minutes}m ago`;
		const hours = Math.floor(minutes / 60);
		if (hours < 24) return `${hours}h ago`;
		return date.toLocaleDateString();
	};

	return (
		<div className="w-full flex flex-col">
			{/* Tab Bar */}
			<div className="flex items-center justify-center mb-3 md:mb-6 border-b border-[#e0e0e0]">
				<div className="flex items-center gap-0.5 md:gap-2 w-full md:w-auto justify-around md:justify-center">
					{tabs.map((tab) => {
						const Icon = tab.icon;
						const isActive = activeTab === tab.id;

						return (
							<button
								key={tab.id}
								onClick={() => setActiveTab(tab.id)}
								className={`
                  relative px-2 md:px-4 py-2 md:py-3 
                  font-medium
                  transition-all duration-200 flex-1 md:flex-initial
                  ${
										isActive ? "text-black" : "text-[#9e9e9e] hover:text-[#666]"
									}
                `}
								style={{
									fontFamily: "Space Grotesk",
									fontSize: "clamp(0.625rem, 2vw, 0.875rem)",
								}}
							>
								<div className="flex items-center justify-center gap-1 md:gap-2">
									<Icon
										size={12}
										className={`${
											isActive ? "text-[#00F28F]" : ""
										} md:w-3.5 md:h-3.5`}
									/>
									<span className="hidden sm:inline whitespace-nowrap">
										{tab.label}
									</span>
									<span className="sm:hidden whitespace-nowrap">
										{tab.id === "probability"
											? "Prob"
											: tab.id === "performance"
											? "Perf"
											: "Feed"}
									</span>
								</div>

								{/* Active indicator */}
								{isActive && (
									<div
										className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00F28F]"
										style={{
											boxShadow: "0 0 8px rgba(0, 242, 143, 0.4)",
										}}
									/>
								)}
							</button>
						);
					})}
				</div>
			</div>

			{/* Tab Content */}
			<div className="w-full">
				{activeTab === "probability" && (
					<div className="animate-fadeIn" style={{ height: "500px" }}>
						<PerformanceGraph marketStatus={market.status} />
					</div>
				)}

				{activeTab === "performance" && (
					<div className="animate-fadeIn">
						{/* <PerformanceDataChart market={market} /> */}
					</div>
				)}

				{activeTab === "feed" && (
					<div
						className="animate-fadeIn border border-[#eaeaea] rounded-xl bg-white overflow-hidden"
						style={{ height: "500px" }}
					>
						<div className="h-full overflow-y-auto">
							{!isTradingApplicable || market.status === "UPCOMING" ? (
								<div className="flex items-center justify-center h-full p-8">
									<div className="text-center space-y-3 max-w-[320px]">
										<div className="w-16 h-16 rounded-full bg-[#f5f5f5] flex items-center justify-center mx-auto mb-2">
											<MessageSquare size={32} className="text-[#9e9e9e]" />
										</div>
										<div
											className="text-[#9e9e9e] font-medium uppercase tracking-wider"
											style={{
												fontFamily: "Space Mono",
												fontSize: "0.75rem",
												letterSpacing: "0.1em",
											}}
										>
											{!isTradingApplicable
												? "NOT APPLICABLE"
												: "NO TRADES YET"}
										</div>
										<p
											className="text-[#666]"
											style={{
												fontFamily: "Space Mono",
												fontSize: "0.8125rem",
												lineHeight: "1.6",
											}}
										>
											{!isTradingApplicable
												? "This market type does not involve agent trading activity. Trade feeds are only available for Agent Performance markets."
												: "The market hasn't opened yet. Live trading will begin when the prediction market starts."}
										</p>
									</div>
								</div>
							) : (
								<>
									{recentTrades.map((trade) => (
										<div
											key={trade.id}
											className="px-5 py-4 border-b border-[#eaeaea] hover:bg-[#fafafa] transition-colors"
										>
											<div className="flex items-start justify-between gap-4">
												<div className="flex-1 min-w-0">
													<div className="flex items-center gap-2 mb-2">
														<span
															className="font-semibold"
															style={{
																fontFamily: "Space Grotesk",
																fontSize: "0.9375rem",
															}}
														>
															{trade.agentName}
														</span>
														<span
															className={`uppercase px-2 py-0.5 rounded font-bold text-white ${
																trade.action === "BUY"
																	? "bg-[#00b67a]"
																	: "bg-[#e24a3b]"
															}`}
															style={{
																fontFamily: "Space Mono",
																fontSize: "0.6875rem",
																letterSpacing: "0.05em",
															}}
														>
															{trade.action}
														</span>
													</div>

													<div
														className="flex items-center gap-2 text-[#9e9e9e] font-medium"
														style={{
															fontFamily: "Space Mono",
															fontSize: "0.75rem",
														}}
													>
														<span>{trade.pair}</span>
														<span>•</span>
														<span>${trade.size.toFixed(2)}</span>
														<span>•</span>
														<span>{formatTime(trade.timestamp)}</span>
													</div>
												</div>

												<div className="flex items-center gap-1.5">
													{trade.pnl >= 0 ? (
														<ArrowUpRight
															size={16}
															className="text-[#00b67a]"
														/>
													) : (
														<ArrowDownRight
															size={16}
															className="text-[#e24a3b]"
														/>
													)}
													<span
														className={`font-semibold ${
															trade.pnl >= 0
																? "text-[#00b67a]"
																: "text-[#e24a3b]"
														}`}
														style={{
															fontFamily: "Space Mono",
															fontSize: "0.9375rem",
														}}
													>
														{trade.pnl >= 0 ? "+" : ""}${trade.pnl.toFixed(2)}
													</span>
												</div>
											</div>
										</div>
									))}
								</>
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
