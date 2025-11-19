"use client";
import { AgentLogoWrapper } from "@/components/AgentLogoWrapper";
import { userBets } from "@/lib/data";
import { ArrowRight, TrendingUp, Wallet } from "lucide-react";
import { useState } from "react";
import { useWallet } from "@/lib/WalletContext";

const onPlaceBet = () => {};
const onAgentClick = (agentId: string) => {};

const PortfolioPage = () => {
	const [activeTab, setActiveTab] = useState<"active" | "completed">("active");
	const { isConnected: isWalletConnected, connectWallet } = useWallet();

	const activeBets = userBets.filter((bet) => bet.status === "ACTIVE");
	const completedBets = userBets.filter((bet) => bet.status === "COMPLETED");

	// Show wallet connection prompt if not connected
	if (!isWalletConnected) {
		return (
			<div className="flex flex-col h-full overflow-y-auto">
				<div className="flex-1 p-3 md:p-6 lg:p-8 max-w-[1400px] mx-auto w-full">
					<div className="flex items-center justify-center py-12 md:py-20">
						<div className="text-center max-w-md px-4">
							<div className="w-16 h-16 md:w-20 md:h-20 bg-[#fafafa] rounded-full flex items-center justify-center mx-auto mb-5 md:mb-6 border-2 border-[#eaeaea]">
								<Wallet size={32} className="text-[#999] md:w-10 md:h-10" />
							</div>
							<h2
								className="text-xl md:text-2xl font-bold mb-2 md:mb-3"
								style={{ fontFamily: "Space Grotesk" }}
							>
								Connect Your Wallet
							</h2>
							<p
								className="text-[#666] mb-6 md:mb-8 text-sm md:text-base"
								style={{ fontFamily: "Space Mono" }}
							>
								Connect your wallet to view your portfolio and track your bets
								across all markets.
							</p>
							<button
								onClick={connectWallet}
								className="px-6 md:px-8 py-3 md:py-3.5 bg-white text-black border-2 border-black rounded-lg font-medium hover:bg-black hover:text-white transition-colors text-sm md:text-base inline-flex items-center gap-2"
								style={{ fontFamily: "Space Grotesk" }}
							>
								<Wallet size={18} />
								Connect Wallet
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}

	const currentBets = activeTab === "active" ? activeBets : completedBets;
	return (
		<div className="flex flex-col h-full overflow-y-auto">
			{/* Main Content */}
			<div className="flex-1 p-3 md:p-6 lg:p-8 max-w-[1400px] mx-auto w-full">
				{/* Header */}
				<div className="mb-6 md:mb-8">
					<h1
						className="text-2xl md:text-3xl font-bold mb-1.5 md:mb-2"
						style={{ fontFamily: "Space Grotesk" }}
					>
						Your Portfolio
					</h1>
					<p
						className="text-[#666] text-sm md:text-base"
						style={{ fontFamily: "Space Mono" }}
					>
						Track your open and completed bets.
					</p>
				</div>

				{/* Tabs */}
				<div className="flex gap-4 md:gap-6 mb-6 border-b border-[#eaeaea]">
					<button
						onClick={() => setActiveTab("active")}
						className={`pb-2 md:pb-3 uppercase font-medium transition-all text-xs md:text-sm ${
							activeTab === "active" ? "border-b-2 border-black" : "text-[#999]"
						}`}
						style={{ fontFamily: "Space Mono", letterSpacing: "0.05em" }}
					>
						Active Bets ({activeBets.length})
					</button>
					<button
						onClick={() => setActiveTab("completed")}
						className={`pb-2 md:pb-3 uppercase font-medium transition-all text-xs md:text-sm ${
							activeTab === "completed"
								? "border-b-2 border-black"
								: "text-[#999]"
						}`}
						style={{ fontFamily: "Space Mono", letterSpacing: "0.05em" }}
					>
						Completed Bets ({completedBets.length})
					</button>
				</div>

				{/* Content */}
				{currentBets.length === 0 ? (
					<div className="flex items-center justify-center py-12 md:py-16">
						<div className="text-center max-w-md px-4">
							<div className="w-14 h-14 md:w-16 md:h-16 bg-[#fafafa] rounded-full flex items-center justify-center mx-auto mb-4 md:mb-5 border border-[#eaeaea]">
								<TrendingUp size={28} className="text-[#999] md:w-8 md:h-8" />
							</div>
							<h2
								className="text-lg md:text-xl font-bold mb-2"
								style={{ fontFamily: "Space Grotesk" }}
							>
								{activeTab === "active"
									? "No active bets yet."
									: "No completed bets yet."}
							</h2>
							<p
								className="text-[#666] mb-5 md:mb-6 text-sm md:text-base"
								style={{ fontFamily: "Space Mono" }}
							>
								{activeTab === "active"
									? "Place your first bet on verifiable intelligence."
									: "Your finished bets will appear here."}
							</p>
							{activeTab === "active" && (
								<button
									onClick={onPlaceBet}
									className="px-5 md:px-6 py-2.5 md:py-3 bg-white text-black border-2 border-black rounded-lg font-medium hover:bg-black hover:text-white transition-colors text-sm md:text-base"
									style={{ fontFamily: "Space Grotesk" }}
								>
									Browse Markets
								</button>
							)}
						</div>
					</div>
				) : (
					<>
						{/* Desktop Table */}
						<div className="border border-[#eaeaea] rounded-xl overflow-hidden hidden md:block">
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
											Market
										</th>
										<th
											className="px-5 py-3.5 text-left text-[#9e9e9e] uppercase tracking-wider font-medium"
											style={{
												fontFamily: "Space Mono",
												fontSize: "0.6875rem",
												letterSpacing: "0.05em",
											}}
										>
											Position
										</th>
										<th
											className="px-5 py-3.5 text-right text-[#9e9e9e] uppercase tracking-wider font-medium"
											style={{
												fontFamily: "Space Mono",
												fontSize: "0.6875rem",
												letterSpacing: "0.05em",
											}}
										>
											Odds
										</th>
										<th
											className="px-5 py-3.5 text-right text-[#9e9e9e] uppercase tracking-wider font-medium"
											style={{
												fontFamily: "Space Mono",
												fontSize: "0.6875rem",
												letterSpacing: "0.05em",
											}}
										>
											Amount
										</th>
										<th
											className="px-5 py-3.5 text-right text-[#9e9e9e] uppercase tracking-wider font-medium"
											style={{
												fontFamily: "Space Mono",
												fontSize: "0.6875rem",
												letterSpacing: "0.05em",
											}}
										>
											{activeTab === "active" ? "Potential Return" : "Result"}
										</th>
									</tr>
								</thead>
								<tbody>
									{currentBets.map((bet, index) => (
										<tr
											key={bet.id}
											className={
												index !== currentBets.length - 1
													? "border-b border-[#eaeaea]"
													: ""
											}
										>
											<td className="px-5 py-4">
												<div className="flex items-center gap-3">
													<div
														className="cursor-pointer transition-transform hover:scale-105 flex-shrink-0"
														onClick={(e) => {
															e.stopPropagation();
															if (onAgentClick) onAgentClick(bet.agent.id);
														}}
													>
														<AgentLogoWrapper
															agentId={bet.agent.id}
															size="small"
														/>
													</div>
													<div className="flex-1 min-w-0">
														<div
															className="text-sm mb-0.5"
															style={{ fontFamily: "Space Grotesk" }}
														>
															{bet.agent.name}
														</div>
														<div
															className="text-[#666] text-xs truncate"
															style={{ fontFamily: "Space Mono" }}
														>
															{bet.marketQuestion}
														</div>
													</div>
												</div>
											</td>
											<td className="px-5 py-4">
												<span
													className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs ${
														bet.position === "YES"
															? "bg-green-50 text-green-700 border border-green-200"
															: "bg-red-50 text-red-700 border border-red-200"
													}`}
													style={{ fontFamily: "Space Mono" }}
												>
													{bet.position}
												</span>
											</td>
											<td
												className="px-5 py-4 text-right"
												style={{ fontFamily: "Space Mono" }}
											>
												{bet.odds.toFixed(2)}x
											</td>
											<td
												className="px-5 py-4 text-right"
												style={{ fontFamily: "Space Mono" }}
											>
												${bet.amount.toLocaleString()}
											</td>
											<td className="px-5 py-4 text-right">
												{activeTab === "active" ? (
													<span style={{ fontFamily: "Space Mono" }}>
														${bet.potentialReturn.toLocaleString()}
													</span>
												) : (
													<div className="flex items-center justify-end gap-2">
														<span
															className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs ${
																bet.outcome === "WON"
																	? "bg-green-50 text-green-700 border border-green-200"
																	: "bg-red-50 text-red-700 border border-red-200"
															}`}
															style={{ fontFamily: "Space Mono" }}
														>
															{bet.outcome}
														</span>
														<span style={{ fontFamily: "Space Mono" }}>
															{bet.outcome === "WON"
																? `+$${(
																		(bet.payout || 0) - bet.amount
																  ).toLocaleString()}`
																: `-$${bet.amount.toLocaleString()}`}
														</span>
													</div>
												)}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>

						{/* Mobile Cards */}
						<div className="space-y-3 md:hidden">
							{currentBets.map((bet) => (
								<div
									key={bet.id}
									className="border border-[#eaeaea] rounded-xl p-4 bg-white"
								>
									{/* Agent & Market */}
									<div className="flex items-start gap-3 mb-3">
										<div
											className="cursor-pointer transition-transform hover:scale-105 flex-shrink-0"
											onClick={(e) => {
												e.stopPropagation();
												if (onAgentClick) onAgentClick(bet.agent.id);
											}}
										>
											<AgentLogoWrapper agentId={bet.agent.id} size="small" />
										</div>
										<div className="flex-1 min-w-0">
											<div
												className="text-sm mb-1"
												style={{ fontFamily: "Space Grotesk" }}
											>
												{bet.agent.name}
											</div>
											<div
												className="text-[#666] text-xs leading-tight"
												style={{ fontFamily: "Space Mono" }}
											>
												{bet.marketQuestion}
											</div>
										</div>
									</div>

									{/* Position Badge */}
									<div className="mb-3">
										<span
											className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs ${
												bet.position === "YES"
													? "bg-green-50 text-green-700 border border-green-200"
													: "bg-red-50 text-red-700 border border-red-200"
											}`}
											style={{ fontFamily: "Space Mono" }}
										>
											{bet.position}
										</span>
									</div>

									{/* Stats Grid */}
									<div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#eaeaea]">
										<div>
											<div
												className="text-[#9e9e9e] text-xs mb-0.5 uppercase"
												style={{
													fontFamily: "Space Mono",
													letterSpacing: "0.05em",
												}}
											>
												Odds
											</div>
											<div style={{ fontFamily: "Space Mono" }}>
												{bet.odds.toFixed(2)}x
											</div>
										</div>
										<div>
											<div
												className="text-[#9e9e9e] text-xs mb-0.5 uppercase"
												style={{
													fontFamily: "Space Mono",
													letterSpacing: "0.05em",
												}}
											>
												Amount
											</div>
											<div style={{ fontFamily: "Space Mono" }}>
												${bet.amount.toLocaleString()}
											</div>
										</div>
										<div className="col-span-2">
											<div
												className="text-[#9e9e9e] text-xs mb-0.5 uppercase"
												style={{
													fontFamily: "Space Mono",
													letterSpacing: "0.05em",
												}}
											>
												{activeTab === "active" ? "Potential Return" : "Result"}
											</div>
											{activeTab === "active" ? (
												<div style={{ fontFamily: "Space Mono" }}>
													${bet.potentialReturn.toLocaleString()}
												</div>
											) : (
												<div className="flex items-center gap-2">
													<span
														className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs ${
															bet.outcome === "WON"
																? "bg-green-50 text-green-700 border border-green-200"
																: "bg-red-50 text-red-700 border border-red-200"
														}`}
														style={{ fontFamily: "Space Mono" }}
													>
														{bet.outcome}
													</span>
													<span style={{ fontFamily: "Space Mono" }}>
														{bet.outcome === "WON"
															? `+$${(
																	(bet.payout || 0) - bet.amount
															  ).toLocaleString()}`
															: `-$${bet.amount.toLocaleString()}`}
													</span>
												</div>
											)}
										</div>
									</div>
								</div>
							))}
						</div>

						{/* CTA for active tab */}
						{activeTab === "active" && (
							<div className="mt-6 text-center">
								<button
									onClick={onPlaceBet}
									className="inline-flex items-center gap-2 px-5 md:px-6 py-2.5 md:py-3 bg-white text-black border-2 border-black rounded-lg font-medium hover:bg-black hover:text-white transition-colors text-sm md:text-base"
									style={{ fontFamily: "Space Grotesk" }}
								>
									Browse More Markets
									<ArrowRight size={16} />
								</button>
							</div>
						)}
					</>
				)}
			</div>

			{/* Footer */}
			<div className="border-t border-[#eaeaea] px-6 md:px-8 py-5">
				<p
					className="text-center text-[#9e9e9e] font-medium"
					style={{ fontFamily: "Space Mono", fontSize: "0.8125rem" }}
				>
					Bet on verifiable intelligence — Real-time AI prediction markets
				</p>
			</div>
		</div>
	);
};

export default PortfolioPage;
