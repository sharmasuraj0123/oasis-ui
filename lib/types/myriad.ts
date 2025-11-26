// Myriad Protocol API Types

export interface PriceChartPoint {
	value: number;
	timestamp: number;
	date: string;
}

export interface PriceCharts {
	timeframe: string;
	prices: PriceChartPoint[];
}

export interface MyriadOutcome {
	id: number;
	title: string;
	price: number;
	shares: number;
	sharesHeld: number;
	closingPrice: number | null;
	priceChange24h: number;
	imageUrl: string;
	price_charts?: PriceCharts[];
}

export interface TokenInfo {
	name: string;
	address: string;
	symbol: string;
	decimals: number;
}

export interface FeeStructure {
	buy: {
		fee: number;
		treasury_fee: number;
		distributor_fee: number;
	};
	sell: {
		fee: number;
		treasury_fee: number;
		distributor_fee: number;
	};
	treasury: string;
	distributor: string;
}

export interface MyriadMarket {
	id: number;
	networkId: number;
	slug: string;
	title: string;
	description: string;
	state: "open" | "closed" | "resolved";
	voided: boolean;
	resolvedOutcomeId: number;
	volume: number;
	volume24h: number;
	liquidity: number;
	liquidityPrice: number;
	shares: number;
	imageUrl: string;
	token: TokenInfo;
	fees: FeeStructure;
	expiresAt: string;
	publishedAt: string;
	resolutionSource: string;
	resolutionTitle?: string;
	topics: string[];
	inPlay: boolean;
	inPlayStartsAt: string | null;
	perpetual: boolean;
	moneyline: boolean;
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

