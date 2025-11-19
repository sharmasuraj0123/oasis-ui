import type { StaticImageData } from "next/image";

const imgGamma =
	"https://images.unsplash.com/photo-1622025118615-c5fb89cd75a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlciUyMGZhY2UlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc2MjI3NzQzMXww&ixlib=rb-4.1.0&q=80&w=400";

export type AgentType = "Trading" | "Liquidity" | "Yield" | "Ecosystem";

export interface Agent {
	id: string;
	name: string;
	avatar: string | StaticImageData;
	color: string;
	team: string;
	teamMembers: string[];
	model: string;
	strategy: string;
	bio: string;
	tagline: string;
	// Performance fields for compatibility
	currentROI: number;
	portfolioValue: number;
	totalPnL: number;
	// New fields for market types
	agentType: AgentType;
	primaryKPI: string;
	kpiValue: string;
	// Additional metrics for different agent types
	rangeUptime?: number; // For liquidity agents
	feeCapture?: number; // For liquidity agents
	apyLift?: number; // For yield agents
	benchmark?: string; // For comparison
}

export interface ProbabilityDataPoint {
	timestamp: number;
	yes: number; // Probability of YES outcome (0-100)
	no: number; // Probability of NO outcome (0-100)
}

export interface Trade {
	id: string;
	agentId: string;
	agentName: string;
	timestamp: number;
	pair: string;
	action: "BUY" | "SELL";
	size: number;
	pnl: number;
	pnlPercent: number;
}

export interface ChatMessage {
	id: string;
	type: "agent" | "user";
	agentId?: string;
	agentName?: string;
	username?: string;
	message: string;
	timestamp: number;
}

export const agents: Agent[] = [
	{
		id: "gtrader",
		name: "GTrader",
		avatar: "/assets/e14400c23c9244fa395191da14623bfafe20d20f.png",
		color: "#00F28F",
		team: "GridTech",
		teamMembers: ["Chen", "Morgan"],
		model: "GPT-4 + Grid Trading",
		strategy: "Algorithmic grid trading with dynamic position sizing",
		bio: "GTrader executes systematic grid trading strategies with intelligent position management and risk controls.",
		tagline: "Grid trading specialist",
		currentROI: 35.2,
		portfolioValue: 13520,
		totalPnL: 3520,
		agentType: "Trading",
		primaryKPI: "ROI",
		kpiValue: "35.2%",
		benchmark: "AlphaArena Median",
	},
	{
		id: "pendle-router",
		name: "Pendle Router",
		avatar: imgGamma,
		color: "#A855F7",
		team: "YieldLabs",
		teamMembers: ["Alex", "Sam"],
		model: "Yield Optimization Engine",
		strategy: "PT vs LSD yield differential trading",
		bio: "Maximizes returns by routing capital between Pendle PT tokens and liquid staking derivatives based on yield spreads.",
		tagline: "Yield Optimizer",
		currentROI: 18.5,
		portfolioValue: 11850,
		totalPnL: 1850,
		agentType: "Yield",
		primaryKPI: "APY Lift",
		kpiValue: "+12 bps",
		apyLift: 12,
	},
	{
		id: "beta",
		name: "Ember",
		avatar: "/assets/1cf91f1bf860bf599172a9b2d5d84c99a7cd2ccd.png",
		color: "#EF4444",
		team: "FireAI Labs",
		teamMembers: ["Alex", "Maria"],
		model: "Claude 3.5 Sonnet + Technical Analysis",
		strategy: "Pattern recognition and precision breakout trading",
		bio: "Ember specializes in advanced technical analysis, identifying key chart patterns and executing precise breakout trades with optimized risk-reward ratios.",
		tagline: "Technical analysis specialist",
		currentROI: 38.7,
		portfolioValue: 13870,
		totalPnL: 3870,
		agentType: "Trading",
		primaryKPI: "ROI",
		kpiValue: "38.7%",
		benchmark: "AlphaArena Median",
	},
];

// Generate probability data - mimicking the attached image
export const generateProbabilityData = (): ProbabilityDataPoint[] => {
	const data: ProbabilityDataPoint[] = [];
	const startTime = Date.now() - 24 * 60 * 60 * 1000; // 24 hours ago

	let yesProb = 55; // Start at 55%
	let noProb = 45; // Start at 45%

	for (let i = 0; i < 144; i++) {
		// 144 data points (every 10 minutes for 24h)
		const timestamp = startTime + i * 10 * 60 * 1000;

		// Add smooth oscillation
		const oscillation = Math.sin(i * 0.15) * 3 + Math.cos(i * 0.08) * 2;
		const noise = (Math.random() - 0.5) * 1.5;

		yesProb = Math.max(35, Math.min(65, yesProb + oscillation * 0.15 + noise));
		noProb = 100 - yesProb;

		data.push({
			timestamp,
			yes: yesProb,
			no: noProb,
		});
	}

	return data;
};

export const probabilityData = generateProbabilityData();

// Performance data for agent detail modal
export interface PerformanceDataPoint {
	timestamp: number;
	gtrader: number;
	"pendle-router": number;
	beta: number;
}

export const generatePerformanceData = (): PerformanceDataPoint[] => {
	const data: PerformanceDataPoint[] = [];
	const startTime = Date.now() - 7 * 24 * 60 * 60 * 1000; // 7 days ago
	const startValue = 10000;

	let gtraderVal = startValue;
	let pendleVal = startValue;
	let betaVal = startValue;

	for (let i = 0; i < 168; i++) {
		// 168 hours in a week
		const timestamp = startTime + i * 60 * 60 * 1000;

		// Generate growth patterns for each agent
		gtraderVal += (Math.random() - 0.32) * 180 + 21; // GTrader
		pendleVal += (Math.random() - 0.4) * 150 + 11; // Pendle Router (more conservative)
		betaVal += (Math.random() - 0.35) * 200 + 23; // Ember

		data.push({
			timestamp,
			gtrader: Math.max(gtraderVal, 3000),
			"pendle-router": Math.max(pendleVal, 3000),
			beta: Math.max(betaVal, 3000),
		});
	}

	return data;
};

export const performanceData = generatePerformanceData();

// Generate recent trades
export const generateRecentTrades = (
	agentName: string,
	agentId?: string
): Trade[] => {
	const trades: Trade[] = [];
	const pairs = ["BTC/USD", "ETH/USD", "SOL/USD", "DOGE/USD", "PUMP/USD"];

	// Determine agent ID from name if not provided
	const finalAgentId = agentId || agentName.toLowerCase().replace(/\s+/g, "");

	for (let i = 0; i < 20; i++) {
		const action = Math.random() > 0.5 ? "BUY" : "SELL";
		const pnl = (Math.random() - 0.4) * 500;

		trades.push({
			id: `trade-${finalAgentId}-${i}`,
			agentId: finalAgentId,
			agentName,
			timestamp: Date.now() - i * 15 * 60 * 1000,
			pair: pairs[Math.floor(Math.random() * pairs.length)],
			action,
			size: Math.random() * 5000 + 100,
			pnl,
			pnlPercent: (pnl / 10000) * 100,
		});
	}

	return trades.sort((a, b) => b.timestamp - a.timestamp);
};

// Export a default recentTrades for backward compatibility
export const recentTrades = [
	...generateRecentTrades("GTrader", "gtrader"),
	...generateRecentTrades("Pendle Router", "pendle-router"),
	...generateRecentTrades("Ember", "beta"),
]
	.sort((a, b) => b.timestamp - a.timestamp)
	.slice(0, 30);

// Market Type definitions
export type MarketType =
	| "Agent Performance"
	| "L2 Ecosystem"
	| "AI Success Metrics";

// Binary Market Interface
export interface BinaryMarket {
	id: string;
	question: string; // The binary question
	agent: {
		id: string;
		name: string;
		avatar: string | StaticImageData;
		color: string;
	};
	yesOdds: number;
	noOdds: number;
	yesPoolSize: number;
	noPoolSize: number;
	status: "LIVE" | "UPCOMING" | "RESOLVED";
	timeRemaining: number; // milliseconds
	totalVolume: number;
	startTime: number;
	endTime: number;
	description: string;
	outcome?: "YES" | "NO"; // For RESOLVED markets
	currentYesProb?: number; // For LIVE markets
	finalYesProb?: number; // For RESOLVED markets
	topWinners?: Array<{
		username: string;
		amount: number;
		multiplier: number;
	}>;
	// New fields for multi-market types
	marketType: MarketType;
	marketTag: {
		label: string;
		emoji: string;
		color: string;
	};
	metrics?: {
		label: string;
		value: string;
		change?: string;
	}[];
	entities?: {
		// For L2 Ecosystem markets
		name: string;
		logo?: string;
	}[];
}

// Mock markets data - new binary prediction markets
export const binaryMarkets: BinaryMarket[] = [
	{
		id: "market-1",
		question:
			"Will GTrader's ROI outperform AlphaArena median by >5% this week?",
		agent: {
			id: "gtrader",
			name: "GTrader",
			avatar: "/assets/e14400c23c9244fa395191da14623bfafe20d20f.png",
			color: "#00F28F",
		},
		yesOdds: 1.72,
		noOdds: 2.15,
		yesPoolSize: 14250,
		noPoolSize: 9780,
		status: "LIVE",
		timeRemaining: 4 * 24 * 60 * 60 * 1000 + 11 * 60 * 60 * 1000,
		totalVolume: 24030,
		startTime: Date.now() - 3 * 24 * 60 * 60 * 1000,
		endTime: Date.now() + 4 * 24 * 60 * 60 * 1000 + 11 * 60 * 60 * 1000,
		description: "Trading agent ROI vs benchmark comparison",
		currentYesProb: 58.5,
		marketType: "Agent Performance",
		marketTag: {
			label: "Agent Performance",
			emoji: "🧠",
			color: "#00F28F",
		},
		metrics: [
			{ label: "ROI", value: "35.2%", change: "+8.4%" },
			{ label: "Range Uptime", value: "94.5%", change: "+2.1%" },
			{ label: "Fee Capture", value: "128 bps", change: "+15 bps" },
		],
	},
	// {
	// 	id: "market-2",
	// 	question: "Will Base surpass Optimism in 24h transactions?",
	// 	agent: {
	// 		id: "base",
	// 		name: "Base",
	// 		avatar: "/assets/1cf91f1bf860bf599172a9b2d5d84c99a7cd2ccd.png",
	// 		color: "#3B82F6",
	// 	},
	// 	yesOdds: 2.4,
	// 	noOdds: 1.58,
	// 	yesPoolSize: 6820,
	// 	noPoolSize: 11450,
	// 	status: "LIVE",
	// 	timeRemaining: 18 * 60 * 60 * 1000,
	// 	totalVolume: 18270,
	// 	startTime: Date.now() - 6 * 60 * 60 * 1000,
	// 	endTime: Date.now() + 18 * 60 * 60 * 1000,
	// 	description: "L2 transaction volume comparison",
	// 	currentYesProb: 37.2,
	// 	marketType: "L2 Ecosystem",
	// 	marketTag: {
	// 		label: "L2 Ecosystem",
	// 		emoji: "🌐",
	// 		color: "#3B82F6",
	// 	},
	// 	entities: [{ name: "Base" }, { name: "Optimism" }],
	// 	metrics: [
	// 		{ label: "TVL (Base)", value: "$2.4B", change: "+12.5%" },
	// 		{ label: "TVL (Optimism)", value: "$1.8B", change: "+8.2%" },
	// 		{ label: "Transactions (24h)", value: "1.2M vs 980K" },
	// 		{ label: "Active Wallets", value: "245K vs 198K" },
	// 	],
	// },
	// {
	// 	id: "market-3",
	// 	question:
	// 		"Will Pendle Router's net APY exceed LSD yield by ≥10bps this epoch?",
	// 	agent: {
	// 		id: "pendle-router",
	// 		name: "Pendle Router",
	// 		avatar: imgGamma,
	// 		color: "#A855F7",
	// 	},
	// 	yesOdds: 1.65,
	// 	noOdds: 2.32,
	// 	yesPoolSize: 15680,
	// 	noPoolSize: 8920,
	// 	status: "LIVE",
	// 	timeRemaining: 5 * 24 * 60 * 60 * 1000 + 14 * 60 * 60 * 1000,
	// 	totalVolume: 24600,
	// 	startTime: Date.now() - 2 * 24 * 60 * 60 * 1000,
	// 	endTime: Date.now() + 5 * 24 * 60 * 60 * 1000 + 14 * 60 * 60 * 1000,
	// 	description: "Comparing PT vs LSD Yields",
	// 	currentYesProb: 63.7,
	// 	marketType: "AI Success Metrics",
	// 	marketTag: {
	// 		label: "AI Success Metrics",
	// 		emoji: "⚙️",
	// 		color: "#A855F7",
	// 	},
	// 	metrics: [
	// 		{ label: "PT Yield", value: "4.82%", change: "+0.15%" },
	// 		{ label: "LSD Yield", value: "4.70%", change: "+0.08%" },
	// 		{ label: "APY Lift", value: "+12 bps", change: "+3 bps" },
	// 	],
	// },
	{
		id: "market-5",
		question: "Will Arbitrum exceed 2M daily transactions this week?",
		agent: {
			id: "arbitrum",
			name: "Arbitrum",
			avatar: "/assets/1cf91f1bf860bf599172a9b2d5d84c99a7cd2ccd.png",
			color: "#3B82F6",
		},
		yesOdds: 1.75,
		noOdds: 2.1,
		yesPoolSize: 12340,
		noPoolSize: 8920,
		status: "UPCOMING",
		timeRemaining: 12 * 60 * 60 * 1000,
		totalVolume: 21260,
		startTime: Date.now() + 12 * 60 * 60 * 1000,
		endTime: Date.now() + 36 * 60 * 60 * 1000,
		description: "L2 activity and adoption metrics",
		marketType: "L2 Ecosystem",
		marketTag: {
			label: "L2 Ecosystem",
			emoji: "🌐",
			color: "#3B82F6",
		},
		metrics: [
			{ label: "Daily Txns", value: "1.85M" },
			{ label: "TVL", value: "$3.2B" },
			{ label: "Active Wallets", value: "312K" },
		],
	},
	{
		id: "market-7",
		question: "Will Ember execute a breakout trade this week?",
		agent: {
			id: "beta",
			name: "Ember",
			avatar: "/assets/1cf91f1bf860bf599172a9b2d5d84c99a7cd2ccd.png",
			color: "#EF4444",
		},
		yesOdds: 1.85,
		noOdds: 2.02,
		yesPoolSize: 11250,
		noPoolSize: 9870,
		status: "UPCOMING",
		timeRemaining: 6 * 60 * 60 * 1000,
		totalVolume: 21120,
		startTime: Date.now() + 6 * 60 * 60 * 1000,
		endTime: Date.now() + 30 * 60 * 60 * 1000,
		description: "Technical analysis pattern recognition",
		marketType: "Agent Performance",
		marketTag: {
			label: "Agent Performance",
			emoji: "🧠",
			color: "#00F28F",
		},
		metrics: [
			{ label: "ROI", value: "38.7%", change: "+5.2%" },
			{ label: "Win Rate", value: "64.2%", change: "+1.8%" },
			{ label: "Sharpe Ratio", value: "2.18" },
		],
	},
];

// User Bet Interface
export interface UserBet {
	id: string;
	marketId: string;
	marketQuestion: string;
	agent: {
		id: string;
		name: string;
		avatar: string | StaticImageData;
		color: string;
	};
	position: "YES" | "NO";
	amount: number;
	odds: number;
	potentialReturn: number;
	placedAt: number;
	status: "ACTIVE" | "COMPLETED";
	outcome?: "WON" | "LOST" | null; // For completed bets
	payout?: number; // For completed bets
}

// Leaderboard Stats Interface - now for individual agents, not competition
export interface LeaderboardAgent {
	rank: number;
	agentId: string;
	name: string;
	avatar: string | StaticImageData;
	color: string;
	accountValue: number;
	returnPercent: number;
	totalPnL: number;
	fees: number;
	winRate: number;
	sharpeRatio: number;
	totalTrades: number;
	marketsParticipated: number;
	performanceHistory: number[];
}

// Mock user bets data
export const userBets: UserBet[] = [
	// Active bets
	{
		id: "bet-1",
		marketId: "market-1",
		marketQuestion:
			"Will GTrader's ROI outperform AlphaArena median by >5% this week?",
		agent: {
			id: "gtrader",
			name: "GTrader",
			avatar: "/assets/e14400c23c9244fa395191da14623bfafe20d20f.png",
			color: "#00F28F",
		},
		position: "YES",
		amount: 500,
		odds: 1.72,
		potentialReturn: 860,
		placedAt: Date.now() - 2 * 24 * 60 * 60 * 1000,
		status: "ACTIVE",
	},
	{
		id: "bet-2",
		marketId: "market-3",
		marketQuestion:
			"Will Pendle Router's net APY exceed LSD yield by ≥10bps this epoch?",
		agent: {
			id: "pendle-router",
			name: "Pendle Router",
			avatar: imgGamma,
			color: "#A855F7",
		},
		position: "YES",
		amount: 750,
		odds: 1.65,
		potentialReturn: 1237.5,
		placedAt: Date.now() - 1 * 24 * 60 * 60 * 1000,
		status: "ACTIVE",
	},
	{
		id: "bet-3",
		marketId: "market-7",
		marketQuestion: "Will Ember execute a breakout trade this week?",
		agent: {
			id: "beta",
			name: "Ember",
			avatar: "/assets/1cf91f1bf860bf599172a9b2d5d84c99a7cd2ccd.png",
			color: "#EF4444",
		},
		position: "YES",
		amount: 300,
		odds: 1.85,
		potentialReturn: 555,
		placedAt: Date.now() - 4 * 60 * 60 * 1000,
		status: "ACTIVE",
	},
	// Completed bets
	{
		id: "bet-4",
		marketId: "market-1",
		marketQuestion:
			"Will GTrader's ROI outperform AlphaArena median by >5% this week?",
		agent: {
			id: "gtrader",
			name: "GTrader",
			avatar: "/assets/e14400c23c9244fa395191da14623bfafe20d20f.png",
			color: "#00F28F",
		},
		position: "YES",
		amount: 600,
		odds: 1.72,
		potentialReturn: 1032,
		placedAt: Date.now() - 4 * 24 * 60 * 60 * 1000,
		status: "COMPLETED",
		outcome: "WON",
		payout: 1032,
	},
	{
		id: "bet-5",
		marketId: "market-3",
		marketQuestion:
			"Will Pendle Router's net APY exceed LSD yield by ≥10bps this epoch?",
		agent: {
			id: "pendle-router",
			name: "Pendle Router",
			avatar: imgGamma,
			color: "#A855F7",
		},
		position: "NO",
		amount: 400,
		odds: 2.32,
		potentialReturn: 928,
		placedAt: Date.now() - 4 * 24 * 60 * 60 * 1000,
		status: "COMPLETED",
		outcome: "LOST",
		payout: 0,
	},
];

// Generate leaderboard data - top 3 agents
export const leaderboardAgents: LeaderboardAgent[] = [
	{
		rank: 1,
		agentId: "beta",
		name: "Ember",
		avatar: "/assets/1cf91f1bf860bf599172a9b2d5d84c99a7cd2ccd.png",
		color: "#EF4444",
		accountValue: 13870,
		returnPercent: 38.7,
		totalPnL: 3870,
		fees: 115,
		winRate: 64.2,
		sharpeRatio: 2.18,
		totalTrades: 128,
		marketsParticipated: 11,
		performanceHistory: [
			10000, 10400, 10600, 11100, 11300, 11800, 12200, 12600, 13100, 13500,
			13870,
		],
	},
	{
		rank: 2,
		agentId: "gtrader",
		name: "GTrader",
		avatar: "/assets/e14400c23c9244fa395191da14623bfafe20d20f.png",
		color: "#00F28F",
		accountValue: 13520,
		returnPercent: 35.2,
		totalPnL: 3520,
		fees: 98,
		winRate: 62.1,
		sharpeRatio: 2.05,
		totalTrades: 156,
		marketsParticipated: 14,
		performanceHistory: [
			10000, 10100, 10500, 10900, 11200, 11600, 12000, 12400, 12800, 13200,
			13520,
		],
	},
	{
		rank: 3,
		agentId: "pendle-router",
		name: "Pendle Router",
		avatar: imgGamma,
		color: "#A855F7",
		accountValue: 11850,
		returnPercent: 18.5,
		totalPnL: 1850,
		fees: 72,
		winRate: 54.3,
		sharpeRatio: 1.67,
		totalTrades: 112,
		marketsParticipated: 8,
		performanceHistory: [
			10000, 10080, 10250, 10450, 10650, 10900, 11150, 11400, 11550, 11700,
			11850,
		],
	},
];

// Performance Data Types for Market Data Visualizations
export interface AgentVsBenchmarkData {
	timestamp: number;
	agentValue: number;
	benchmarkValue: number;
}

export interface YieldComparisonData {
	timestamp: number;
	pendleAPY: number;
	lsdYield: number;
}

export interface L2TransactionData {
	timestamp: number;
	base: number;
	optimism: number;
}

export interface UptimeData {
	timestamp: number;
	uptime: number;
}

// Generate GTrader vs AlphaArena median ROI data
export const generateAgentVsBenchmarkData = (): AgentVsBenchmarkData[] => {
	const data: AgentVsBenchmarkData[] = [];
	const startTime = Date.now() - 7 * 24 * 60 * 60 * 1000; // 7 days ago

	let agentROI = 30; // Starting at 30%
	let benchmarkROI = 27; // Starting at 27%

	for (let i = 0; i < 168; i++) {
		// 168 hours in a week
		const timestamp = startTime + i * 60 * 60 * 1000;

		// Agent performance with more volatility
		const agentNoise = (Math.random() - 0.5) * 0.8;
		const agentTrend = Math.sin(i * 0.1) * 0.3;
		agentROI = Math.max(28, Math.min(38, agentROI + agentTrend + agentNoise));

		// Benchmark with less volatility
		const benchmarkNoise = (Math.random() - 0.5) * 0.5;
		const benchmarkTrend = Math.sin(i * 0.08) * 0.2;
		benchmarkROI = Math.max(
			26,
			Math.min(32, benchmarkROI + benchmarkTrend + benchmarkNoise)
		);

		data.push({
			timestamp,
			agentValue: agentROI,
			benchmarkValue: benchmarkROI,
		});
	}

	return data;
};

// Generate Pendle Router vs LSD yield data (in basis points)
export const generateYieldComparisonData = (): YieldComparisonData[] => {
	const data: YieldComparisonData[] = [];
	const startTime = Date.now() - 30 * 24 * 60 * 60 * 1000; // 30 days ago

	let pendleAPY = 385; // Starting at 385 bps (3.85%)
	let lsdYield = 372; // Starting at 372 bps (3.72%)

	for (let i = 0; i < 30; i++) {
		// 30 days
		const timestamp = startTime + i * 24 * 60 * 60 * 1000;

		// Pendle APY with moderate volatility
		const pendleNoise = (Math.random() - 0.5) * 8;
		const pendleTrend = Math.cos(i * 0.2) * 5;
		pendleAPY = Math.max(
			370,
			Math.min(410, pendleAPY + pendleTrend + pendleNoise)
		);

		// LSD yield more stable
		const lsdNoise = (Math.random() - 0.5) * 4;
		const lsdTrend = Math.cos(i * 0.15) * 3;
		lsdYield = Math.max(365, Math.min(395, lsdYield + lsdTrend + lsdNoise));

		data.push({
			timestamp,
			pendleAPY,
			lsdYield,
		});
	}

	return data;
};

// Generate Base vs Optimism transaction data
export const generateL2TransactionData = (): L2TransactionData[] => {
	const data: L2TransactionData[] = [];
	const startTime = Date.now() - 7 * 24 * 60 * 60 * 1000; // 7 days ago

	let baseTxs = 1.5; // Starting at 1.5M transactions
	let optimismTxs = 1.7; // Starting at 1.7M transactions

	for (let i = 0; i < 7; i++) {
		// 7 days
		const timestamp = startTime + i * 24 * 60 * 60 * 1000;

		// Base with growth trend
		const baseNoise = (Math.random() - 0.4) * 0.15;
		const baseTrend = 0.05; // Growing faster
		baseTxs = Math.max(1.3, Math.min(2.2, baseTxs + baseTrend + baseNoise));

		// Optimism more stable
		const optimismNoise = (Math.random() - 0.5) * 0.12;
		const optimismTrend = 0.02;
		optimismTxs = Math.max(
			1.4,
			Math.min(2.0, optimismTxs + optimismTrend + optimismNoise)
		);

		data.push({
			timestamp,
			base: baseTxs,
			optimism: optimismTxs,
		});
	}

	return data;
};

// Generate uptime data for liquidity tracking
export const generateUptimeData = (): UptimeData[] => {
	const data: UptimeData[] = [];
	const startTime = Date.now() - 7 * 24 * 60 * 60 * 1000; // 7 days ago

	let uptime = 91; // Starting at 91%

	for (let i = 0; i < 168; i++) {
		// 168 hours in a week
		const timestamp = startTime + i * 60 * 60 * 1000;

		// Uptime with minor fluctuations, staying mostly above 90%
		const noise = (Math.random() - 0.5) * 1.2;
		const trend = Math.sin(i * 0.05) * 0.5;
		uptime = Math.max(88, Math.min(96, uptime + trend + noise));

		data.push({
			timestamp,
			uptime,
		});
	}

	return data;
};

// Export generated data
export const agentVsBenchmarkData = generateAgentVsBenchmarkData();
export const yieldComparisonData = generateYieldComparisonData();
export const l2TransactionData = generateL2TransactionData();
export const uptimeData = generateUptimeData();
