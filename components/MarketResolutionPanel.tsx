import { Trophy, TrendingUp, TrendingDown, CheckCircle2 } from "lucide-react";

interface TopWinner {
	username: string;
	amount: number;
	multiplier: number;
}

interface MarketResolutionPanelProps {
	outcome: "YES" | "NO";
	finalYesProb: number;
	topWinners?: TopWinner[];
}

export function MarketResolutionPanel({
	outcome,
	finalYesProb,
	topWinners,
}: MarketResolutionPanelProps) {
	const finalNoProb = 100 - finalYesProb;
	const isYes = outcome === "YES";

	return (
		<div className="border border-[#eaeaea] rounded-xl p-4 md:p-6 bg-white">
			{/* Header */}
			<div className="flex items-center gap-2 mb-4 pb-4 border-b border-[#eaeaea]">
				<div className="w-8 h-8 rounded-lg bg-[#10B981]/10 flex items-center justify-center">
					<Trophy size={16} className="text-[#10B981]" />
				</div>
				<div className="flex-1">
					<h3
						className="text-sm font-bold"
						style={{ fontFamily: "Space Grotesk" }}
					>
						Market Resolved
					</h3>
					<p
						className="text-xs text-[#9e9e9e]"
						style={{ fontFamily: "Space Mono" }}
					>
						Final outcome & top winners
					</p>
				</div>
				<div className="px-2.5 py-1 bg-[#DCFCE7] text-[#065F46] rounded-md">
					<span
						className="text-[0.625rem] font-bold uppercase tracking-wider"
						style={{ fontFamily: "Space Mono" }}
					>
						Resolved
					</span>
				</div>
			</div>

			{/* Outcome Section */}
			<div className="mb-6">
				<div
					className={`p-4 rounded-lg border-2 ${
						isYes
							? "bg-[#00b67a]/5 border-[#00b67a]"
							: "bg-[#e24a3b]/5 border-[#e24a3b]"
					}`}
				>
					<div className="flex items-center gap-3 mb-3">
						<div
							className={`w-12 h-12 rounded-full flex items-center justify-center ${
								isYes ? "bg-[#00b67a]" : "bg-[#e24a3b]"
							}`}
						>
							{isYes ? (
								<TrendingUp size={24} className="text-white" />
							) : (
								<TrendingDown size={24} className="text-white" />
							)}
						</div>
						<div className="flex-1">
							<div className="flex items-center gap-2 mb-1">
								<CheckCircle2
									size={16}
									className={isYes ? "text-[#00b67a]" : "text-[#e24a3b]"}
								/>
								<span
									className="text-xs text-[#9e9e9e] uppercase tracking-wider"
									style={{ fontFamily: "Space Mono" }}
								>
									Result
								</span>
							</div>
							<h4
								className="text-2xl font-bold"
								style={{
									fontFamily: "Space Grotesk",
									color: isYes ? "#00b67a" : "#e24a3b",
								}}
							>
								{outcome}
							</h4>
						</div>
					</div>

					{/* Final Probabilities */}
					<div className="grid grid-cols-2 gap-2">
						<div className="p-2 bg-white rounded">
							<p
								className="text-[0.625rem] text-[#9e9e9e] uppercase tracking-wider mb-0.5"
								style={{ fontFamily: "Space Mono" }}
							>
								YES
							</p>
							<p
								className="text-sm font-bold"
								style={{ fontFamily: "Space Mono", color: "#00b67a" }}
							>
								{finalYesProb.toFixed(1)}%
							</p>
						</div>
						<div className="p-2 bg-white rounded">
							<p
								className="text-[0.625rem] text-[#9e9e9e] uppercase tracking-wider mb-0.5"
								style={{ fontFamily: "Space Mono" }}
							>
								NO
							</p>
							<p
								className="text-sm font-bold"
								style={{ fontFamily: "Space Mono", color: "#e24a3b" }}
							>
								{finalNoProb.toFixed(1)}%
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* Top Winners */}
			{topWinners && topWinners.length > 0 && (
				<div>
					<div className="flex items-center gap-2 mb-3">
						<Trophy size={14} className="text-[#F59E0B]" />
						<h4
							className="text-xs font-bold uppercase tracking-wider text-[#666]"
							style={{ fontFamily: "Space Mono" }}
						>
							Top Winners
						</h4>
					</div>

					<div className="space-y-2">
						{topWinners.map((winner, index) => (
							<div
								key={winner.username}
								className="flex items-center gap-3 p-3 bg-[#fafafa] rounded-lg border border-[#eaeaea]"
							>
								<div
									className="flex items-center justify-center w-7 h-7 rounded-full bg-[#F59E0B] text-white font-bold text-xs"
									style={{ fontFamily: "Space Mono" }}
								>
									{index + 1}
								</div>
								<div className="flex-1 min-w-0">
									<p
										className="text-xs font-medium truncate"
										style={{ fontFamily: "Space Mono" }}
									>
										{winner.username}
									</p>
									<p
										className="text-[0.625rem] text-[#9e9e9e]"
										style={{ fontFamily: "Space Mono" }}
									>
										{winner.multiplier.toFixed(2)}× multiplier
									</p>
								</div>
								<div className="text-right">
									<p
										className="text-xs font-bold text-[#00b67a]"
										style={{ fontFamily: "Space Mono" }}
									>
										+${winner.amount.toLocaleString()}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
