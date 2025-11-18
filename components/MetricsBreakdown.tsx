"use client";
import { TrendingUp, TrendingDown } from "lucide-react";

interface Metric {
	label: string;
	value: string;
	change?: string;
}

interface MetricsBreakdownProps {
	metrics: Metric[];
}

export function MetricsBreakdown({ metrics }: MetricsBreakdownProps) {
	const getChangeColor = (change?: string) => {
		if (!change) return "";
		return change.startsWith("+") ? "text-[#00b67a]" : "text-[#e24a3b]";
	};

	const getChangeIcon = (change?: string) => {
		if (!change) return null;
		return change.startsWith("+") ? (
			<TrendingUp size={12} className="text-[#00b67a]" />
		) : (
			<TrendingDown size={12} className="text-[#e24a3b]" />
		);
	};

	return (
		<div className="mb-4 md:mb-5">
			<h3
				className="mb-2.5 md:mb-3"
				style={{
					fontFamily: "Space Grotesk",
					fontSize: "clamp(0.875rem, 2.5vw, 1rem)",
					lineHeight: "1.5",
					fontWeight: "600",
				}}
			>
				Metric Breakdown
			</h3>
			<div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 md:gap-3">
				{metrics.map((metric, index) => (
					<div
						key={index}
						className="p-2.5 md:p-3 bg-[#fafafa] border border-[#eaeaea] rounded-lg"
					>
						<div
							className="text-[#666666] mb-1 truncate"
							style={{
								fontFamily: "Space Mono",
								fontSize: "clamp(0.5625rem, 1.8vw, 0.625rem)",
								lineHeight: "1.4",
								textTransform: "uppercase",
								letterSpacing: "0.3px",
							}}
						>
							{metric.label}
						</div>
						<div className="flex items-center justify-between gap-1">
							<div
								className="font-bold truncate"
								style={{
									fontFamily: "Space Mono",
									fontSize: "clamp(0.875rem, 3vw, 1.125rem)",
									lineHeight: "1.3",
								}}
							>
								{metric.value}
							</div>
							{metric.change && (
								<div
									className={`flex items-center gap-0.5 flex-shrink-0 ${getChangeColor(
										metric.change
									)}`}
									style={{
										fontFamily: "Space Mono",
										fontSize: "clamp(0.625rem, 2vw, 0.75rem)",
										lineHeight: "1.3",
									}}
								>
									{getChangeIcon(metric.change)}
									<span className="whitespace-nowrap">{metric.change}</span>
								</div>
							)}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
