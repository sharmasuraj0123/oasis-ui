"use client";
import { useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface OutcomeDetailsPanelProps {
	outcomes: Array<{
		id: number;
		title: string;
		shares: number;
		sharesHeld: number;
		price: number;
		closingPrice: number | null;
		priceChange24h: number;
		imageUrl: string;
		price_charts?: Array<{
			timeframe: string;
			prices: Array<{
				value: number;
				timestamp: number;
				date: string;
			}>;
		}>;
	}>;
}

export const OutcomeDetailsPanel = ({ outcomes }: OutcomeDetailsPanelProps) => {
	const [selectedTimeframe, setSelectedTimeframe] = useState("24h");

	return (
		<div className="border border-[#eaeaea] rounded-xl p-4 bg-white">
			<h3
				className="text-sm font-bold mb-3"
				style={{ fontFamily: "Space Grotesk" }}
			>
				Outcome Details
			</h3>
			<div className="space-y-4">
				{outcomes.map((outcome) => (
					<div
						key={outcome.id}
						className="border border-[#eaeaea] rounded-lg p-3"
					>
						<div className="flex items-start justify-between mb-3">
							<div className="flex items-center gap-2">
								{outcome.imageUrl && (
									<img
										src={outcome.imageUrl}
										alt={outcome.title}
										className="w-8 h-8 rounded object-cover"
									/>
								)}
								<div>
									<p
										className="text-sm font-bold"
										style={{ fontFamily: "Space Grotesk" }}
									>
										{outcome.title}
									</p>
									<p
										className="text-xs text-[#9e9e9e]"
										style={{ fontFamily: "Space Mono" }}
									>
										Outcome #{outcome.id}
									</p>
								</div>
							</div>
							<div className="text-right">
								<p
									className="text-lg font-bold"
									style={{ fontFamily: "Space Grotesk" }}
								>
									{(outcome.price * 100).toFixed(1)}%
								</p>
								{outcome.priceChange24h !== 0 && (
									<div
										className={`flex items-center gap-1 text-xs ${
											outcome.priceChange24h > 0
												? "text-green-600"
												: "text-red-600"
										}`}
										style={{ fontFamily: "Space Mono" }}
									>
										{outcome.priceChange24h > 0 ? (
											<TrendingUp size={12} />
										) : (
											<TrendingDown size={12} />
										)}
										{Math.abs(outcome.priceChange24h * 100).toFixed(2)}%
									</div>
								)}
							</div>
						</div>

						<div className="grid grid-cols-2 gap-3">
							<div>
								<p
									className="text-xs text-[#9e9e9e] mb-0.5"
									style={{ fontFamily: "Space Mono" }}
								>
									Total Shares
								</p>
								<p
									className="text-sm font-medium"
									style={{ fontFamily: "Space Grotesk" }}
								>
									{outcome.shares.toFixed(2)}
								</p>
							</div>
							<div>
								<p
									className="text-xs text-[#9e9e9e] mb-0.5"
									style={{ fontFamily: "Space Mono" }}
								>
									Shares Held
								</p>
								<p
									className="text-sm font-medium"
									style={{ fontFamily: "Space Grotesk" }}
								>
									{outcome.sharesHeld.toFixed(2)}
								</p>
							</div>
						</div>

						{outcome.closingPrice !== null && (
							<div className="mt-2 pt-2 border-t border-[#eaeaea]">
								<p
									className="text-xs text-[#9e9e9e] mb-0.5"
									style={{ fontFamily: "Space Mono" }}
								>
									Closing Price
								</p>
								<p
									className="text-sm font-medium"
									style={{ fontFamily: "Space Grotesk" }}
								>
									{(outcome.closingPrice * 100).toFixed(2)}%
								</p>
							</div>
						)}

						{/* Price Chart Data Info */}
						{outcome.price_charts && outcome.price_charts.length > 0 && (
							<div className="mt-3 pt-3 border-t border-[#eaeaea]">
								<p
									className="text-xs text-[#9e9e9e] mb-2"
									style={{ fontFamily: "Space Mono" }}
								>
									Price History Available
								</p>
								<div className="flex flex-wrap gap-1">
									{outcome.price_charts.map((chart) => (
										<span
											key={chart.timeframe}
											className="text-xs bg-[#f5f5f5] px-2 py-1 rounded"
											style={{ fontFamily: "Space Mono" }}
										>
											{chart.timeframe} ({chart.prices.length} points)
										</span>
									))}
								</div>
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
};

