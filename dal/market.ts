// Data Access Layer for Markets
import { BinaryMarket, binaryMarkets } from "@/lib/data";
import { fetchLeBronJamesMarket, fetchOscarPiastriMarket } from "@/lib/myriad-client";
import { MyriadMarket } from "@/lib/types/myriad";

/**
 * Convert a Myriad market to our internal BinaryMarket format
 */
export function convertMyriadToBinaryMarket(
	myriadMarket: MyriadMarket
): BinaryMarket {
	const yesOutcome = myriadMarket.outcomes.find((o) => o.id === 0);
	const noOutcome = myriadMarket.outcomes.find((o) => o.id === 1);

	const yesPrice = yesOutcome?.price || 0.5;
	const noPrice = noOutcome?.price || 0.5;

	// Calculate odds (inverse of probability)
	const yesOdds = yesPrice > 0 ? 1 / yesPrice : 2.0;
	const noOdds = noPrice > 0 ? 1 / noPrice : 2.0;

	// Convert probability to percentage
	const yesProb = yesPrice * 100;
	const noProb = noPrice * 100;

	// Calculate time remaining
	const expiresAt = new Date(myriadMarket.expiresAt).getTime();
	const now = Date.now();
	const timeRemaining = Math.max(0, expiresAt - now);

	// Determine status based on Myriad state
	let status: "LIVE" | "UPCOMING" | "RESOLVED";
	if (myriadMarket.state === "resolved") {
		status = "RESOLVED";
	} else if (myriadMarket.state === "open") {
		// Check if market has started
		const publishedAt = new Date(myriadMarket.publishedAt).getTime();
		status = publishedAt > now ? "UPCOMING" : "LIVE";
	} else {
		status = "RESOLVED";
	}

	// Determine market tag based on content
	const isF1Market = myriadMarket.title.toLowerCase().includes("f1") || 
	                   myriadMarket.title.toLowerCase().includes("formula") ||
	                   myriadMarket.title.toLowerCase().includes("piastri");
	const isBasketball = myriadMarket.title.toLowerCase().includes("lebron") || 
	                     myriadMarket.title.toLowerCase().includes("nba");

	let marketTag = {
		label: myriadMarket.topics[0] || "Myriad",
		emoji: "🎯",
		color: "#6366F1",
	};

	if (isF1Market) {
		marketTag = {
			label: "Formula 1",
			emoji: "🏎️",
			color: "#EF4444",
		};
	} else if (isBasketball) {
		marketTag = {
			label: "NBA",
			emoji: "🏀",
			color: "#FF6B00",
		};
	}

	return {
		id: `myriad-${myriadMarket.id}`,
		question: myriadMarket.title,
		agent: {
			id: "myriad",
			name: "Myriad",
			avatar: "/assets/64c3eb28d5567a20f539ef61c7bdab745480f46c.png",
			color: "#6366F1",
		},
		yesOdds,
		noOdds,
		yesPoolSize: yesOutcome?.shares || 0,
		noPoolSize: noOutcome?.shares || 0,
		status,
		timeRemaining,
		totalVolume: myriadMarket.volume,
		startTime: new Date(myriadMarket.publishedAt).getTime(),
		endTime: expiresAt,
		description: myriadMarket.description,
		currentYesProb: status === "LIVE" ? yesProb : undefined,
		finalYesProb: status === "RESOLVED" ? yesProb : undefined,
		marketType: "AI Success Metrics",
		marketTag,
		metrics: [
			{ label: "Volume", value: `$${myriadMarket.volume.toFixed(2)}` },
			{ label: "Volume (24h)", value: `$${myriadMarket.volume24h.toFixed(2)}` },
			{ label: "Liquidity", value: `$${myriadMarket.liquidity.toFixed(2)}` },
			{ label: "Total Shares", value: myriadMarket.shares.toFixed(2) },
			{
				label: "Network",
				value:
					myriadMarket.networkId === 59141
						? "Linea Testnet"
						: `Chain ${myriadMarket.networkId}`,
			},
		],
		// Preserve all Myriad data
		myriadData: {
			networkId: myriadMarket.networkId,
			slug: myriadMarket.slug,
			imageUrl: myriadMarket.imageUrl,
			publishedAt: myriadMarket.publishedAt,
			expiresAt: myriadMarket.expiresAt,
			resolutionSource: myriadMarket.resolutionSource,
			resolutionTitle: myriadMarket.resolutionTitle,
			token: myriadMarket.token,
			fees: myriadMarket.fees,
			volume24h: myriadMarket.volume24h,
			liquidityPrice: myriadMarket.liquidityPrice,
			shares: myriadMarket.shares,
			voided: myriadMarket.voided,
			resolvedOutcomeId: myriadMarket.resolvedOutcomeId,
			inPlay: myriadMarket.inPlay,
			perpetual: myriadMarket.perpetual,
			moneyline: myriadMarket.moneyline,
			outcomes: myriadMarket.outcomes.map(outcome => ({
				id: outcome.id,
				title: outcome.title,
				shares: outcome.shares,
				sharesHeld: outcome.sharesHeld,
				price: outcome.price,
				closingPrice: outcome.closingPrice,
				priceChange24h: outcome.priceChange24h,
				imageUrl: outcome.imageUrl,
				price_charts: outcome.price_charts,
			})),
		},
	};
}

/**
 * Get a market by ID (supports both static and Myriad markets)
 */
export async function getMarketById(
	marketId: string
): Promise<BinaryMarket | null> {
	// Check if it's a Myriad market - LeBron James
	if (marketId === "lebron-james" || marketId === "myriad-3") {
		try {
			const myriadMarket = await fetchLeBronJamesMarket();
			return convertMyriadToBinaryMarket(myriadMarket);
		} catch (error) {
			console.error("Failed to fetch Myriad market:", error);
			return null;
		}
	}

	// Check if it's a Myriad market - Oscar Piastri
	if (marketId === "oscar-piastri" || marketId === "myriad-1") {
		try {
			const myriadMarket = await fetchOscarPiastriMarket();
			return convertMyriadToBinaryMarket(myriadMarket);
		} catch (error) {
			console.error("Failed to fetch Oscar Piastri market:", error);
			return null;
		}
	}

	// Check static markets
	const staticMarket = binaryMarkets.find((m) => m.id === marketId);
	return staticMarket || null;
}

/**
 * Get all markets (includes both static and Myriad markets)
 */
export async function getAllMarkets(): Promise<BinaryMarket[]> {
	const markets = [...binaryMarkets];

	// Try to add the LeBron James market
	try {
		const lebronMarket = await fetchLeBronJamesMarket();
		const convertedMarket = convertMyriadToBinaryMarket(lebronMarket);
		// Override the ID to make it consistent
		convertedMarket.id = "lebron-james";
		markets.push(convertedMarket);
	} catch (error) {
		console.error("Failed to fetch LeBron James market:", error);
		// Continue without the Myriad market
	}

	// Try to add the Oscar Piastri F1 market
	try {
		const piastriMarket = await fetchOscarPiastriMarket();
		const convertedMarket = convertMyriadToBinaryMarket(piastriMarket);
		// Override the ID to make it consistent
		convertedMarket.id = "oscar-piastri";
		markets.push(convertedMarket);
	} catch (error) {
		console.error("Failed to fetch Oscar Piastri F1 market:", error);
		// Continue without the Myriad market
	}

	return markets;
}

