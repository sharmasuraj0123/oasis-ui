import { Clock, Info } from "lucide-react";
import { AgentLogoWrapper } from "./AgentLogoWrapper";
import { StaticImageData } from "next/image";

interface UpcomingMarketPanelProps {
	agent: {
		id: string;
		name: string;
		avatar: string | StaticImageData;
		color: string;
	};
	timeRemaining: number;
	onAgentClick: (agentId: string) => void;
}

export function UpcomingMarketPanel({
	agent,
	timeRemaining,
	onAgentClick,
}: UpcomingMarketPanelProps) {
	// Format time remaining
	const formatTimeRemaining = (ms: number) => {
		const days = Math.floor(ms / (24 * 60 * 60 * 1000));
		const hours = Math.floor((ms % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
		const minutes = Math.floor((ms % (60 * 60 * 1000)) / (60 * 1000));

		if (days > 0) {
			return `${days}d ${hours}h`;
		} else if (hours > 0) {
			return `${hours}h ${minutes}m`;
		} else {
			return `${minutes}m`;
		}
	};

	return (
		<div className="border border-[#eaeaea] rounded-xl p-4 md:p-6 bg-white">
			{/* Header */}
			<div className="flex items-center gap-2 mb-4 pb-4 border-b border-[#eaeaea]">
				<div className="w-8 h-8 rounded-lg bg-[#FEF3C7] flex items-center justify-center">
					<Clock size={16} className="text-[#F59E0B]" />
				</div>
				<div className="flex-1">
					<h3
						className="text-sm font-bold"
						style={{ fontFamily: "Space Grotesk" }}
					>
						Market Opens Soon
					</h3>
					<p
						className="text-xs text-[#9e9e9e]"
						style={{ fontFamily: "Space Mono" }}
					>
						Learn about the agent before the market starts
					</p>
				</div>
				<div className="px-2.5 py-1 bg-[#FEF3C7] text-[#92400E] rounded-md">
					<span
						className="text-[0.625rem] font-bold uppercase tracking-wider"
						style={{ fontFamily: "Space Mono" }}
					>
						Upcoming
					</span>
				</div>
			</div>

			{/* Countdown */}
			<div className="mb-6 p-4 bg-[#FEF3C7] border border-[#F59E0B] rounded-lg text-center">
				<p
					className="text-[0.625rem] text-[#92400E] uppercase tracking-wider mb-1"
					style={{ fontFamily: "Space Mono" }}
				>
					Market Starts In
				</p>
				<p
					className="text-2xl font-bold text-[#92400E]"
					style={{ fontFamily: "Space Grotesk" }}
				>
					{formatTimeRemaining(timeRemaining)}
				</p>
			</div>

			{/* Agent Card */}
			<div className="border border-[#eaeaea] rounded-lg p-4 bg-[#fafafa] mb-4">
				<div className="flex items-center gap-3 mb-3">
					<AgentLogoWrapper agentId={agent.id} size="medium" />
					<div className="flex-1">
						<h4
							className="text-base font-bold mb-0.5"
							style={{ fontFamily: "Space Grotesk", color: agent.color }}
						>
							{agent.name}
						</h4>
						<p
							className="text-xs text-[#9e9e9e]"
							style={{ fontFamily: "Space Mono" }}
						>
							Learn about this agent's strategy and model
						</p>
					</div>
				</div>
				<button
					onClick={() => onAgentClick(agent.id)}
					className="w-full flex items-center justify-center gap-2 py-2.5 bg-white text-black border border-[#d0d0d0] rounded-lg hover:border-black hover:bg-[#fafafa] transition-colors text-sm font-medium"
					style={{ fontFamily: "Space Grotesk" }}
				>
					<Info size={16} />
					View Agent Details
				</button>
			</div>

			{/* Info Box */}
			<div className="p-3 bg-[#f5f5f5] rounded-lg flex items-start gap-2">
				<Info size={14} className="text-[#666] flex-shrink-0 mt-0.5" />
				<p
					className="text-xs text-[#666]"
					style={{ fontFamily: "Space Mono", lineHeight: "1.5" }}
				>
					Review the agent's model, strategy, and historical performance before
					placing your prediction.
				</p>
			</div>
		</div>
	);
}
