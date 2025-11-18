"use client";

import { AgentLogoWrapper } from "@/components/AgentLogoWrapper";
import { agents, AgentType, binaryMarkets } from "@/lib/data";
import { Activity, BarChart3, Filter } from "lucide-react";
import { useState } from "react";

const onAgentClick = (agentId: string) => {};

const AgentsPage = () => {
	const [filterType, setFilterType] = useState<"ALL" | AgentType>("ALL");

	// Get market count for each agent
	const getAgentMarketCount = (agentId: string) => {
		return binaryMarkets.filter((market) => market.agent.id === agentId).length;
	};

	// Get active markets for each agent
	const getActiveMarkets = (agentId: string) => {
		return binaryMarkets.filter(
			(market) => market.agent.id === agentId && market.status === "LIVE"
		).length;
	};

	// Filter agents by type
	const filteredAgents = agents.filter((agent) => {
		if (filterType === "ALL") return true;
		return agent.agentType === filterType;
	});

	return (
		<div className="p-3 md:p-6 lg:p-8 overflow-y-auto">
			<div className="max-w-[1400px] mx-auto">
				{/* Header */}
				<div className="mb-6 md:mb-10">
					<h2
						className="mb-1.5 md:mb-2 text-xl md:text-2xl font-bold"
						style={{ fontFamily: "Space Grotesk" }}
					>
						All Agents
					</h2>
					<p
						className="text-[#9e9e9e] font-medium text-xs md:text-sm"
						style={{ fontFamily: "Space Mono" }}
					>
						Browse all AI agents across different markets
					</p>
				</div>

				{/* Filter Bar */}
				<div className="mb-6 flex items-center gap-3">
					<Filter size={16} className="text-[#9e9e9e]" />
					<select
						value={filterType}
						onChange={(e) => setFilterType(e.target.value as any)}
						className="px-3 py-[10px] border border-[#eaeaea] rounded-[10px] focus:outline-none focus:border-black transition-colors cursor-pointer"
						style={{ fontFamily: "Space Mono", fontSize: "13px" }}
					>
						<option value="ALL">All Agents</option>
						<option value="Trading">Trading Agents</option>
						<option value="Liquidity">Liquidity Agents</option>
						<option value="Yield">Yield Agents</option>
						<option value="Ecosystem">Ecosystem</option>
					</select>
				</div>

				{/* Agent Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mb-8">
					{filteredAgents.map((agent) => {
						const marketCount = getAgentMarketCount(agent.id);
						const activeMarkets = getActiveMarkets(agent.id);

						return (
							<div
								key={agent.id}
								onClick={() => onAgentClick(agent.id)}
								className="border-2 border-[#eaeaea] rounded-xl p-5 bg-white hover:border-black hover:shadow-lg transition-all cursor-pointer group"
							>
								{/* Agent Header */}
								<div className="flex items-center gap-4 mb-4">
									<div className="flex-shrink-0">
										<AgentLogoWrapper agentId={agent.id} size="small" />
									</div>
									<div className="flex-1 min-w-0">
										<h3
											className="font-bold text-lg mb-1 truncate"
											style={{ fontFamily: "Space Grotesk" }}
										>
											{agent.name}
										</h3>
										<span
											className="text-xs font-bold px-2.5 py-1 rounded"
											style={{
												fontFamily: "Space Mono",
												backgroundColor: `${agent.color}20`,
												color: agent.color,
											}}
										>
											{agent.team}
										</span>
									</div>
								</div>

								{/* Tagline */}
								<p
									className="text-sm mb-4 text-[#666]"
									style={{ fontFamily: "Space Mono" }}
								>
									{agent.tagline}
								</p>

								{/* Bio */}
								<p
									className="text-xs text-[#666] mb-4 line-clamp-3 leading-relaxed"
									style={{ fontFamily: "Space Mono" }}
								>
									{agent.bio}
								</p>

								{/* Stats */}
								<div className="grid grid-cols-2 gap-3 pt-4 border-t border-[#eaeaea] mb-4">
									<div>
										<div className="flex items-center gap-1.5 mb-1">
											<BarChart3 size={12} className="text-[#9e9e9e]" />
											<p
												className="text-[0.625rem] text-[#9e9e9e] uppercase tracking-wider"
												style={{ fontFamily: "Space Mono" }}
											>
												Total Markets
											</p>
										</div>
										<p
											className="text-sm font-bold"
											style={{ fontFamily: "Space Mono" }}
										>
											{marketCount}
										</p>
									</div>
									<div>
										<div className="flex items-center gap-1.5 mb-1">
											<Activity size={12} className="text-[#00b67a]" />
											<p
												className="text-[0.625rem] text-[#9e9e9e] uppercase tracking-wider"
												style={{ fontFamily: "Space Mono" }}
											>
												Live Now
											</p>
										</div>
										<p
											className="text-sm font-bold"
											style={{
												fontFamily: "Space Mono",
												color: activeMarkets > 0 ? "#00b67a" : "#9e9e9e",
											}}
										>
											{activeMarkets}
										</p>
									</div>
								</div>

								{/* Model Info */}
								<div className="bg-[#fafafa] rounded-lg p-3 mb-4">
									<p
										className="text-[0.625rem] text-[#9e9e9e] uppercase tracking-wider mb-1"
										style={{ fontFamily: "Space Mono" }}
									>
										Model
									</p>
									<p
										className="text-xs font-medium"
										style={{ fontFamily: "Space Mono" }}
									>
										{agent.model}
									</p>
								</div>

								{/* Strategy */}
								<div className="bg-[#fafafa] rounded-lg p-3">
									<p
										className="text-[0.625rem] text-[#9e9e9e] uppercase tracking-wider mb-1"
										style={{ fontFamily: "Space Mono" }}
									>
										Strategy
									</p>
									<p
										className="text-xs font-medium"
										style={{ fontFamily: "Space Mono" }}
									>
										{agent.strategy}
									</p>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default AgentsPage;
