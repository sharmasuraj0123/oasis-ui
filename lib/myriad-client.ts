// Myriad Protocol API Client
import {
	MyriadMarket,
	MyriadMarketsResponse,
	MyriadMarketEventsResponse,
	MyriadHoldersResponse,
	MyriadQuoteRequest,
	MyriadQuoteResponse,
	MyriadErrorResponse,
} from "./types/myriad";

const MYRIAD_API_URL =
	process.env.NEXT_PUBLIC_MYRIAD_API_URL ||
	"https://api-v2.staging.myriadprotocol.com";

const MYRIAD_API_KEY = process.env.NEXT_PUBLIC_MYRIAD_API_KEY;

// Base fetch function with error handling
async function myriadFetch<T>(
	endpoint: string,
	options: RequestInit = {}
): Promise<T> {
	if (!MYRIAD_API_KEY) {
		throw new Error(
			"Myriad API key not configured. Please set NEXT_PUBLIC_MYRIAD_API_KEY in your .env.local file."
		);
	}

	const headers = {
		"Content-Type": "application/json",
		"x-api-key": MYRIAD_API_KEY,
		...options.headers,
	};

	const response = await fetch(`${MYRIAD_API_URL}${endpoint}`, {
		...options,
		headers,
		// Add cache revalidation for Next.js
		next: { revalidate: 60 }, // Revalidate every 60 seconds
	});

	if (!response.ok) {
		let errorMessage = `Myriad API error: ${response.status} ${response.statusText}`;

		try {
			const errorData: MyriadErrorResponse = await response.json();
			errorMessage = errorData.message || errorMessage;
		} catch (e) {
			// If JSON parsing fails, use default error message
		}

		throw new Error(errorMessage);
	}

	return response.json();
}

/**
 * Fetch all markets from Myriad Protocol
 */
export async function fetchMyriadMarkets(params?: {
	networkId?: number;
	state?: "open" | "closed" | "resolved";
	keyword?: string;
	limit?: number;
	page?: number;
	sort?: "volume" | "liquidity" | "created" | "ending";
	order?: "asc" | "desc";
}): Promise<MyriadMarketsResponse> {
	const searchParams = new URLSearchParams();

	if (params?.networkId) searchParams.append("network_id", String(params.networkId));
	if (params?.state) searchParams.append("state", params.state);
	if (params?.keyword) searchParams.append("keyword", params.keyword);
	if (params?.limit) searchParams.append("limit", String(params.limit));
	if (params?.page) searchParams.append("page", String(params.page));
	if (params?.sort) searchParams.append("sort", params.sort);
	if (params?.order) searchParams.append("order", params.order);

	const queryString = searchParams.toString();
	const endpoint = `/markets${queryString ? `?${queryString}` : ""}`;

	return myriadFetch<MyriadMarketsResponse>(endpoint);
}

/**
 * Fetch a specific market by ID
 */
export async function fetchMyriadMarket(
	marketId: number,
	networkId: number
): Promise<MyriadMarket> {
	const endpoint = `/markets/${marketId}?network_id=${networkId}`;
	return myriadFetch<MyriadMarket>(endpoint);
}

/**
 * Fetch a specific market by slug
 */
export async function fetchMyriadMarketBySlug(
	slug: string,
	networkId?: number
): Promise<MyriadMarket> {
	const endpoint = `/markets/${slug}${networkId ? `?network_id=${networkId}` : ""}`;
	return myriadFetch<MyriadMarket>(endpoint);
}

/**
 * Fetch market events (trade history)
 */
export async function fetchMyriadMarketEvents(
	marketId: number,
	networkId: number,
	params?: {
		limit?: number;
		page?: number;
	}
): Promise<MyriadMarketEventsResponse> {
	const searchParams = new URLSearchParams({
		network_id: String(networkId),
	});

	if (params?.limit) searchParams.append("limit", String(params.limit));
	if (params?.page) searchParams.append("page", String(params.page));

	const endpoint = `/markets/${marketId}/events?${searchParams.toString()}`;
	return myriadFetch<MyriadMarketEventsResponse>(endpoint);
}

/**
 * Fetch market holders
 */
export async function fetchMyriadMarketHolders(
	marketId: number,
	networkId: number,
	params?: {
		limit?: number;
		page?: number;
	}
): Promise<MyriadHoldersResponse> {
	const searchParams = new URLSearchParams({
		network_id: String(networkId),
	});

	if (params?.limit) searchParams.append("limit", String(params.limit));
	if (params?.page) searchParams.append("page", String(params.page));

	const endpoint = `/markets/${marketId}/holders?${searchParams.toString()}`;
	return myriadFetch<MyriadHoldersResponse>(endpoint);
}

/**
 * Get a quote for buying/selling shares
 */
export async function fetchMyriadQuote(
	request: MyriadQuoteRequest
): Promise<MyriadQuoteResponse> {
	const endpoint = "/markets/quote";
	return myriadFetch<MyriadQuoteResponse>(endpoint, {
		method: "POST",
		body: JSON.stringify(request),
	});
}

/**
 * Fetch the LeBron James market specifically
 */
export async function fetchLeBronJamesMarket(): Promise<MyriadMarket> {
	const LEBRON_MARKET_ID = 3;
	const LINEA_TESTNET_ID = 59141;

	try {
		return await fetchMyriadMarket(LEBRON_MARKET_ID, LINEA_TESTNET_ID);
	} catch (error) {
		console.error("Failed to fetch LeBron James market:", error);
		throw error;
	}
}

