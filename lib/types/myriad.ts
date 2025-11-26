// Myriad Protocol API Types

export interface MyriadOutcome {
	id: number;
	title: string;
	price: number;
	shares: number;
	sharesHeld: number;
	price_charts?: {
		"24h"?: Array<{ timestamp: number; price: number }>;
		"7d"?: Array<{ timestamp: number; price: number }>;
		"30d"?: Array<{ timestamp: number; price: number }>;
		all?: Array<{ timestamp: number; price: number }>;
	};
}

export interface MyriadMarket {
	id: number;
	networkId: number;
	slug: string;
	title: string;
	description: string;
	state: "open" | "closed" | "resolved";
	volume: number;
	liquidity: number;
	tokenAddress: string;
	expiresAt: string;
	publishedAt: string;
	resolutionSource: string;
	resolutionTitle?: string;
	topics: string[];
	outcomes: MyriadOutcome[];
}

export interface MyriadMarketsResponse {
	data: MyriadMarket[];
	pagination: {
		page: number;
		limit: number;
		total: number;
		totalPages: number;
		hasNext: boolean;
		hasPrev: boolean;
	};
}

export interface MyriadMarketEvent {
	id: string;
	action: "buy" | "sell" | "add_liquidity" | "remove_liquidity" | "claim";
	user: string;
	outcomeId: number;
	outcomeTitle: string;
	shares: number;
	value: number;
	timestamp: string;
	transactionHash: string;
}

export interface MyriadMarketEventsResponse {
	data: MyriadMarketEvent[];
	pagination: {
		page: number;
		limit: number;
		total: number;
		totalPages: number;
		hasNext: boolean;
		hasPrev: boolean;
	};
}

export interface MyriadHolder {
	user: string;
	shares: number;
	averagePrice: number;
	totalInvested: number;
}

export interface MyriadHoldersByOutcome {
	outcomeId: number;
	outcomeTitle: string;
	totalHolders: number;
	holders: MyriadHolder[];
}

export interface MyriadHoldersResponse {
	data: MyriadHoldersByOutcome[];
}

export interface MyriadQuoteRequest {
	marketId: number;
	networkId: number;
	outcomeId: number;
	amount: number;
	action: "buy" | "sell";
}

export interface MyriadQuoteResponse {
	shares: number;
	price: number;
	priceImpact: number;
	fee: number;
	total: number;
}

export interface MyriadErrorResponse {
	error: string;
	message: string;
	statusCode: number;
}

