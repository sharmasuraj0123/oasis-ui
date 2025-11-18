import { TrendingUp } from "lucide-react";

interface BettingWidgetProps {
	onPlaceBet: () => void;
}

export function BettingWidget({ onPlaceBet }: BettingWidgetProps) {
	return (
		<div
			className="border border-[#eaeaea] bg-white p-[21px]"
			style={{ borderRadius: "16.4px" }}
		>
			<div className="flex items-start justify-between mb-4">
				<div>
					<h3
						className="font-bold mb-1"
						style={{
							fontFamily: "Space Grotesk",
							fontSize: "18px",
							lineHeight: "28px",
						}}
					>
						Binary Market Pool
					</h3>
					<p
						className="text-[#666666]"
						style={{
							fontFamily: "Space Mono",
							fontSize: "12px",
							lineHeight: "16px",
						}}
					>
						Pick YES or NO
					</p>
				</div>
				<TrendingUp size={20} className="text-[#00b67a]" />
			</div>

			{/* Quick Stats */}
			<div className="grid grid-cols-2 gap-3 mb-4">
				<div className="p-[13px] bg-[#fafafa] rounded-[10px] border border-[#eaeaea]">
					<div
						className="text-[#666666] mb-1"
						style={{
							fontFamily: "Space Mono",
							fontSize: "11px",
							lineHeight: "17.6px",
						}}
					>
						TOTAL POOL
					</div>
					<div
						className="font-bold"
						style={{
							fontFamily: "Space Mono",
							fontSize: "16px",
							lineHeight: "24px",
						}}
					>
						$23,430
					</div>
				</div>
				<div className="p-[13px] bg-[#fafafa] rounded-[10px] border border-[#eaeaea]">
					<div
						className="text-[#666666] mb-1"
						style={{
							fontFamily: "Space Mono",
							fontSize: "11px",
							lineHeight: "17.6px",
						}}
					>
						YOUR BETS
					</div>
					<div
						className="font-bold"
						style={{
							fontFamily: "Space Mono",
							fontSize: "16px",
							lineHeight: "24px",
						}}
					>
						0
					</div>
				</div>
			</div>

			{/* CTA Button */}
			<button
				onClick={onPlaceBet}
				className="w-full py-3 bg-white text-black border-2 border-black rounded-[10px] font-medium hover:bg-black hover:text-white transition-colors text-center"
				style={{
					fontFamily: "Space Grotesk",
					fontSize: "16px",
					lineHeight: "24px",
				}}
			>
				Place Bet
			</button>

			{/* Popular Bet */}
			<div className="mt-4 pt-4 border-t border-[#eaeaea]">
				<div
					className="text-[#666666] mb-2"
					style={{
						fontFamily: "Space Mono",
						fontSize: "11px",
						lineHeight: "17.6px",
						textTransform: "uppercase",
					}}
				>
					Most Popular
				</div>
				<div className="flex items-center justify-between">
					<span
						className="font-medium"
						style={{
							fontFamily: "Space Grotesk",
							fontSize: "14px",
							lineHeight: "22.4px",
						}}
					>
						GTrader
					</span>
					<span
						className="text-[#00b67a] font-bold"
						style={{
							fontFamily: "Space Mono",
							fontSize: "14px",
							lineHeight: "22.4px",
						}}
					>
						1.72x
					</span>
				</div>
			</div>
		</div>
	);
}
