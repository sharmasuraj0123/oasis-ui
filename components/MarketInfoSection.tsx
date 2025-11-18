"use client";
import { BinaryMarket } from "../lib/data";
import { Info } from "lucide-react";

interface MarketInfoSectionProps {
	market: BinaryMarket;
}

export function MarketInfoSection({ market }: MarketInfoSectionProps) {
	// Generate market-specific content based on market type
	const getMarketInfo = () => {
		switch (market.marketType) {
			case "Agent Performance":
				return {
					title: "About this Market",
					description: `This market tracks the comparative performance of ${market.agent.name}, an autonomous trading agent, against the AlphaArena benchmark index.`,
					details: [
						"Agent ROI is sampled in real time from simulated trading data, while the AlphaArena median represents the average return of all registered strategy agents within the ecosystem.",
					],
					dataUpdates:
						"ROI and benchmark snapshots are updated every hour, with daily summaries displayed on the performance chart. All metrics are fetched via Myriad and Gaia AVS mock APIs for this demo.",
					findMore: [
						{
							label: "Trade Log",
							text: `Navigate to the Performance tab on ${market.agent.name}'s Agent Page to view simulated trade entries and timestamps.`,
						},
						{
							label: "Benchmark Data",
							text: "Hover over chart points to compare agent vs. AlphaArena performance.",
						},
						{
							label: "Resolution Logic",
							text: `This market resolves YES if ${market.agent.name}'s ROI exceeds AlphaArena's median by >5% at snapshot time (Sunday 00:00 UTC).`,
						},
					],
				};

			case "L2 Ecosystem":
				return {
					title: "About this Market",
					description: `This market tracks comparative metrics between ${
						market.entities?.[0]?.name || "Layer 2"
					} and ${market.entities?.[1]?.name || "other L2"} ecosystems.`,
					details: [
						"Transaction counts, TVL, and active wallet metrics are aggregated from multiple data sources including L2Beat, DefiLlama, and Dune Analytics.",
					],
					dataUpdates:
						"All L2 metrics are updated every 15 minutes. Historical data is aggregated daily for performance comparison charts.",
					findMore: [
						{
							label: "Data Sources",
							text: "Transaction data from L2Beat, TVL from DefiLlama, wallet activity from Dune Analytics.",
						},
						{
							label: "Comparison Metrics",
							text: "Hover over chart points to view detailed breakdowns of each L2's performance.",
						},
						{
							label: "Resolution Logic",
							text: "This market resolves YES if the primary entity exceeds the comparison entity in the specified metric at snapshot time.",
						},
					],
				};

			case "AI Success Metrics":
				return {
					title: "About this Market",
					description: `This market tracks whether ${market.agent.name} can maintain a competitive advantage in yield optimization strategies.`,
					details: [
						"Yield metrics compare Principal Token (PT) returns against Liquid Staking Derivative (LSD) baseline yields, with all data sourced from on-chain protocols.",
					],
					dataUpdates:
						"APY calculations are updated every epoch (typically 24 hours), with real-time yield tracking displayed on the performance chart.",
					findMore: [
						{
							label: "Yield Data",
							text: `Navigate to the Performance tab on ${market.agent.name}'s Agent Page to view detailed yield breakdowns.`,
						},
						{
							label: "Baseline Comparison",
							text: "Hover over chart points to compare PT yield vs LSD baseline over time.",
						},
						{
							label: "Resolution Logic",
							text: "This market resolves YES if the APY lift exceeds the specified threshold (≥10bps) at epoch end.",
						},
					],
				};

			default:
				return {
					title: "About this Market",
					description: market.description,
					details: [
						"Market data is updated in real-time based on agent performance and trading activity.",
					],
					dataUpdates:
						"All metrics are updated continuously as the market progresses.",
					findMore: [
						{
							label: "Agent Details",
							text: `View ${market.agent.name}'s full profile and trading history in the Agents section.`,
						},
						{
							label: "Resolution Logic",
							text: "This market resolves based on verifiable on-chain or API data at the specified end time.",
						},
					],
				};
		}
	};

	const info = getMarketInfo();

	return (
		<div className="border-t border-[#eaeaea] pt-4 md:pt-5 mt-4 md:mt-5">
			<div className="flex items-center gap-2 mb-3 md:mb-4">
				<Info
					size={14}
					className="text-[#9e9e9e] flex-shrink-0 md:w-4 md:h-4"
				/>
				<h3
					style={{
						fontFamily: "Space Grotesk",
						fontSize: "clamp(0.875rem, 2.5vw, 1rem)",
						lineHeight: "1.5",
						fontWeight: "600",
					}}
				>
					{info.title}
				</h3>
			</div>

			<div className="space-y-3 md:space-y-4">
				<p
					className="text-[#333]"
					style={{
						fontFamily: "Space Mono",
						fontSize: "clamp(0.75rem, 2vw, 0.8125rem)",
						lineHeight: "1.6",
					}}
				>
					{info.description}
				</p>

				{info.details.map((detail, index) => (
					<p
						key={index}
						className="text-[#666]"
						style={{
							fontFamily: "Space Mono",
							fontSize: "clamp(0.6875rem, 2vw, 0.75rem)",
							lineHeight: "1.6",
						}}
					>
						{detail}
					</p>
				))}

				<div>
					<p
						className="font-bold mb-1.5 text-[#333]"
						style={{
							fontFamily: "Space Mono",
							fontSize: "clamp(0.625rem, 2vw, 0.6875rem)",
							lineHeight: "1.5",
							textTransform: "uppercase",
							letterSpacing: "0.5px",
						}}
					>
						Data Updates:
					</p>
					<p
						className="text-[#666]"
						style={{
							fontFamily: "Space Mono",
							fontSize: "clamp(0.6875rem, 2vw, 0.75rem)",
							lineHeight: "1.6",
						}}
					>
						{info.dataUpdates}
					</p>
				</div>

				<div>
					<p
						className="font-bold mb-2 text-[#333]"
						style={{
							fontFamily: "Space Mono",
							fontSize: "clamp(0.625rem, 2vw, 0.6875rem)",
							lineHeight: "1.5",
							textTransform: "uppercase",
							letterSpacing: "0.5px",
						}}
					>
						Where to Find More:
					</p>
					<ul className="space-y-2.5 md:space-y-2">
						{info.findMore.map((item, index) => (
							<li
								key={index}
								className="flex flex-col sm:flex-row gap-1 sm:gap-2"
							>
								<span
									className="text-[#333] font-bold flex-shrink-0"
									style={{
										fontFamily: "Space Mono",
										fontSize: "clamp(0.6875rem, 2vw, 0.75rem)",
										lineHeight: "1.6",
									}}
								>
									{item.label}:
								</span>
								<span
									className="text-[#666]"
									style={{
										fontFamily: "Space Mono",
										fontSize: "clamp(0.6875rem, 2vw, 0.75rem)",
										lineHeight: "1.6",
									}}
								>
									{item.text}
								</span>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}
