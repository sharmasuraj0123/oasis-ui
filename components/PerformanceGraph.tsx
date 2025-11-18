import { useState, useMemo } from "react";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	Legend,
	ReferenceLine,
} from "recharts";
import { probabilityData, ProbabilityDataPoint } from "../lib/data";
import {
	Calendar,
	Clock,
	Trophy,
	TrendingUp,
	TrendingDown,
} from "lucide-react";

interface PerformanceGraphProps {
	marketStatus?: "LIVE" | "UPCOMING" | "RESOLVED";
}

type TimeRange = "24H" | "12H" | "6H" | "3H" | "1H";

export function PerformanceGraph({
	marketStatus = "LIVE",
}: PerformanceGraphProps) {
	const [timeRange, setTimeRange] = useState<TimeRange>("24H");

	// Filter data based on time range
	const formattedData = useMemo(() => {
		const hoursMap: Record<TimeRange, number> = {
			"24H": 24,
			"12H": 12,
			"6H": 6,
			"3H": 3,
			"1H": 1,
		};

		const hours = hoursMap[timeRange];
		const minutesTotal = hours * 60;
		const dataPointsNeeded = Math.floor(minutesTotal / 10); // Every 10 minutes

		return probabilityData.slice(-dataPointsNeeded);
	}, [timeRange]);

	// Generate custom ticks for X-axis based on time range
	const xAxisTicks = useMemo(() => {
		if (formattedData.length === 0) return [];

		const tickCountMap: Record<TimeRange, number> = {
			"24H": 6,
			"12H": 4,
			"6H": 4,
			"3H": 3,
			"1H": 4,
		};

		const tickCount = tickCountMap[timeRange];
		const ticks: number[] = [];
		const totalPoints = formattedData.length;

		if (totalPoints <= tickCount) {
			return formattedData.map((d) => d.timestamp);
		}

		const step = Math.floor((totalPoints - 1) / (tickCount - 1));

		for (let i = 0; i < tickCount; i++) {
			const index = Math.min(i * step, totalPoints - 1);
			ticks.push(formattedData[index].timestamp);
		}

		return ticks;
	}, [formattedData, timeRange]);

	// Format X-axis labels based on time range
	const formatXAxis = (timestamp: number) => {
		const date = new Date(timestamp);
		return `${String(date.getHours()).padStart(2, "0")}:${String(
			date.getMinutes()
		).padStart(2, "0")}`;
	};

	// Get current probabilities (last data point)
	const currentProbs = formattedData[formattedData.length - 1] || {
		yes: 50,
		no: 50,
	};

	return (
		<div className="w-full h-full flex flex-col min-h-0 relative">
			{/* Header */}
			<div className="flex items-start md:items-center justify-between mb-3 md:mb-5 flex-col md:flex-row gap-2.5 md:gap-3 flex-shrink-0">
				<div className="min-w-0 flex-1">
					<h2
						className="font-semibold"
						style={{
							fontFamily: "Space Grotesk",
							fontSize: "clamp(0.875rem, 3vw, 1.125rem)",
							lineHeight: "1.3",
						}}
					>
						Prediction Probability
					</h2>
					<p
						className="text-[#9e9e9e] mt-0.5 md:mt-1 font-medium"
						style={{
							fontFamily: "Space Mono",
							fontSize: "clamp(0.6875rem, 2vw, 0.875rem)",
							lineHeight: "1.4",
						}}
					>
						YES vs NO probability over time
					</p>
				</div>

				<div className="flex items-center gap-2 w-full md:w-auto">
					{/* Time Range Toggle */}
					<div className="flex items-center gap-1 border border-black rounded-lg p-0.5">
						{(["24H", "12H", "6H", "3H", "1H"] as TimeRange[]).map((range) => (
							<button
								key={range}
								onClick={() => setTimeRange(range)}
								className={`px-2 md:px-2.5 py-1.5 rounded font-medium transition-colors ${
									timeRange === range
										? "bg-black text-white"
										: "hover:bg-[#f5f5f5]"
								}`}
								style={{
									fontFamily: "Space Mono",
									fontSize: "clamp(0.625rem, 1.8vw, 0.6875rem)",
									letterSpacing: "0.02em",
								}}
							>
								{range}
							</button>
						))}
					</div>
				</div>
			</div>

			{/* Current Probabilities Display */}
			<div className="grid grid-cols-2 gap-2.5 md:gap-3 mb-3 md:mb-4 flex-shrink-0">
				<div className="border border-[#00b67a] rounded-lg p-2.5 md:p-3 bg-[#00b67a]/5">
					<div className="flex items-center gap-1.5 md:gap-2 mb-0.5 md:mb-1">
						<TrendingUp
							size={12}
							className="text-[#00b67a] md:w-3.5 md:h-3.5"
						/>
						<span
							className="font-medium"
							style={{
								fontFamily: "Space Mono",
								fontSize: "clamp(0.625rem, 2vw, 0.75rem)",
							}}
						>
							YES
						</span>
					</div>
					<p
						className="font-bold text-[#00b67a]"
						style={{
							fontFamily: "Space Mono",
							fontSize: "clamp(1.25rem, 5vw, 1.5rem)",
						}}
					>
						{currentProbs.yes.toFixed(1)}%
					</p>
				</div>
				<div className="border border-[#e24a3b] rounded-lg p-2.5 md:p-3 bg-[#e24a3b]/5">
					<div className="flex items-center gap-1.5 md:gap-2 mb-0.5 md:mb-1">
						<TrendingDown
							size={12}
							className="text-[#e24a3b] md:w-3.5 md:h-3.5"
						/>
						<span
							className="font-medium"
							style={{
								fontFamily: "Space Mono",
								fontSize: "clamp(0.625rem, 2vw, 0.75rem)",
							}}
						>
							NO
						</span>
					</div>
					<p
						className="font-bold text-[#e24a3b]"
						style={{
							fontFamily: "Space Mono",
							fontSize: "clamp(1.25rem, 5vw, 1.5rem)",
						}}
					>
						{currentProbs.no.toFixed(1)}%
					</p>
				</div>
			</div>

			{/* Chart - Desktop */}
			<div
				className="flex-1 min-h-0 hidden md:block"
				style={{ minHeight: "300px" }}
			>
				<ResponsiveContainer width="100%" height="100%">
					<LineChart
						data={formattedData}
						margin={{ top: 10, right: 30, left: -10, bottom: 10 }}
						key={timeRange}
					>
						<CartesianGrid strokeDasharray="0" stroke="#eaeaea" />
						<XAxis
							dataKey="timestamp"
							ticks={xAxisTicks}
							tickFormatter={formatXAxis}
							stroke="#9e9e9e"
							style={{ fontFamily: "Space Mono", fontSize: "0.625rem" }}
							tick={{ fill: "#9e9e9e" }}
						/>
						<YAxis
							domain={[0, 100]}
							ticks={[0, 25, 50, 75, 100]}
							tickFormatter={(value) => `${value}%`}
							stroke="#9e9e9e"
							style={{ fontFamily: "Space Mono", fontSize: "0.625rem" }}
							tick={{ fill: "#9e9e9e" }}
							width={45}
						/>
						<Tooltip
							contentStyle={{
								backgroundColor: "white",
								border: "1px solid #000",
								borderRadius: "8px",
								fontFamily: "Space Mono",
								fontSize: "0.75rem",
								padding: "6px 10px",
							}}
							formatter={(value: any) => `${value.toFixed(1)}%`}
							labelFormatter={(ts) => new Date(ts).toLocaleString()}
						/>
						<Legend
							wrapperStyle={{
								fontFamily: "Space Mono",
								fontSize: "0.75rem",
								paddingTop: "10px",
							}}
						/>
						<ReferenceLine
							y={50}
							stroke="#9e9e9e"
							strokeDasharray="3 3"
							strokeWidth={1.5}
							label={{
								value: "50%",
								position: "insideTopRight",
								style: {
									fontFamily: "Space Mono",
									fontSize: "0.625rem",
									fill: "#9e9e9e",
									fontWeight: 500,
								},
							}}
						/>
						<Line
							type="monotone"
							dataKey="yes"
							stroke="#00b67a"
							strokeWidth={2.5}
							dot={false}
							activeDot={{ r: 4 }}
							name="YES"
						/>
						<Line
							type="monotone"
							dataKey="no"
							stroke="#e24a3b"
							strokeWidth={2.5}
							dot={false}
							activeDot={{ r: 4 }}
							name="NO"
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>

			{/* Chart - Mobile */}
			<div className="flex flex-col gap-3 md:hidden">
				<div className="w-full h-[280px]">
					<ResponsiveContainer width="100%" height={280}>
						<LineChart
							data={formattedData}
							margin={{ top: 10, right: 5, left: -15, bottom: 5 }}
							key={`mobile-${timeRange}`}
						>
							<CartesianGrid strokeDasharray="0" stroke="#eaeaea" />
							<XAxis
								dataKey="timestamp"
								ticks={xAxisTicks}
								tickFormatter={formatXAxis}
								stroke="#9e9e9e"
								style={{ fontFamily: "Space Mono", fontSize: "0.5625rem" }}
								tick={{ fill: "#9e9e9e" }}
								height={35}
							/>
							<YAxis
								domain={[0, 100]}
								ticks={[0, 50, 100]}
								tickFormatter={(value) => `${value}%`}
								stroke="#9e9e9e"
								style={{ fontFamily: "Space Mono", fontSize: "0.5625rem" }}
								tick={{ fill: "#9e9e9e" }}
								width={35}
							/>
							<Tooltip
								contentStyle={{
									backgroundColor: "white",
									border: "1px solid #000",
									borderRadius: "6px",
									fontFamily: "Space Mono",
									fontSize: "0.625rem",
									padding: "4px 6px",
								}}
								formatter={(value: any) => `${value.toFixed(1)}%`}
								labelFormatter={(ts) => new Date(ts).toLocaleDateString()}
							/>
							<ReferenceLine
								y={50}
								stroke="#9e9e9e"
								strokeDasharray="3 3"
								strokeWidth={1}
								label={{
									value: "50%",
									position: "insideTopRight",
									style: {
										fontFamily: "Space Mono",
										fontSize: "0.5rem",
										fill: "#9e9e9e",
										fontWeight: 500,
									},
								}}
							/>
							<Line
								type="monotone"
								dataKey="yes"
								stroke="#00b67a"
								strokeWidth={2}
								dot={false}
								activeDot={{ r: 3 }}
								name="YES"
							/>
							<Line
								type="monotone"
								dataKey="no"
								stroke="#e24a3b"
								strokeWidth={2}
								dot={false}
								activeDot={{ r: 3 }}
								name="NO"
							/>
						</LineChart>
					</ResponsiveContainer>
				</div>

				{/* Mobile Legend */}
				<div className="flex items-center justify-center gap-4 px-2">
					<div className="flex items-center gap-1.5">
						<div className="w-3 h-3 rounded-sm bg-[#00b67a]" />
						<span
							className="text-[0.625rem] font-medium"
							style={{ fontFamily: "Space Mono" }}
						>
							YES {currentProbs.yes.toFixed(1)}%
						</span>
					</div>
					<div className="flex items-center gap-1.5">
						<div className="w-3 h-3 rounded-sm bg-[#e24a3b]" />
						<span
							className="text-[0.625rem] font-medium"
							style={{ fontFamily: "Space Mono" }}
						>
							NO {currentProbs.no.toFixed(1)}%
						</span>
					</div>
				</div>
			</div>

			{/* Status Overlays */}
			{marketStatus === "UPCOMING" && (
				<div className="absolute inset-0 bg-white/95 backdrop-blur-sm rounded-xl flex items-center justify-center z-10">
					<div className="text-center px-6 max-w-md">
						<div className="w-16 h-16 rounded-full bg-[#FEF3C7] flex items-center justify-center mx-auto mb-4">
							<Clock size={32} className="text-[#F59E0B]" />
						</div>
						<h3
							className="text-xl font-bold mb-2"
							style={{ fontFamily: "Space Grotesk" }}
						>
							Market Opening Soon
						</h3>
						<p
							className="text-sm text-[#666]"
							style={{ fontFamily: "Space Mono", lineHeight: "1.6" }}
						>
							This market hasn't started yet. Probability tracking will begin
							once the market opens.
						</p>
					</div>
				</div>
			)}

			{marketStatus === "RESOLVED" && (
				<div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/90 to-white/95 backdrop-blur-[2px] rounded-xl flex items-center justify-center z-10 pointer-events-none">
					<div className="text-center px-6 max-w-md pointer-events-auto">
						<div className="w-16 h-16 rounded-full bg-[#DCFCE7] flex items-center justify-center mx-auto mb-4 border-2 border-[#00b67a]">
							<Trophy size={32} className="text-[#00b67a]" />
						</div>
						<h3
							className="text-xl font-bold mb-2"
							style={{ fontFamily: "Space Grotesk" }}
						>
							Market Resolved
						</h3>
						<p
							className="text-sm text-[#666] mb-4"
							style={{ fontFamily: "Space Mono", lineHeight: "1.6" }}
						>
							This prediction market has concluded. Final result is shown below
							in the Market Resolution panel.
						</p>
						<div
							className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg"
							style={{ fontFamily: "Space Mono", fontSize: "0.75rem" }}
						>
							<Trophy size={14} />
							<span>VIEW FINAL RESULT</span>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
