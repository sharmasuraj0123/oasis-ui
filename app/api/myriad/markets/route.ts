// API Route: GET /api/myriad/markets
import { NextRequest, NextResponse } from "next/server";
import { fetchMyriadMarkets } from "@/lib/myriad-client";

export async function GET(request: NextRequest) {
	try {
		const searchParams = request.nextUrl.searchParams;

		const params = {
			networkId: searchParams.get("networkId")
				? Number(searchParams.get("networkId"))
				: undefined,
			state: searchParams.get("state") as "open" | "closed" | "resolved" | undefined,
			keyword: searchParams.get("keyword") || undefined,
			limit: searchParams.get("limit") ? Number(searchParams.get("limit")) : undefined,
			page: searchParams.get("page") ? Number(searchParams.get("page")) : undefined,
			sort: searchParams.get("sort") as
				| "volume"
				| "liquidity"
				| "created"
				| "ending"
				| undefined,
			order: searchParams.get("order") as "asc" | "desc" | undefined,
		};

		const markets = await fetchMyriadMarkets(params);

		return NextResponse.json(markets);
	} catch (error) {
		console.error("Error fetching Myriad markets:", error);

		return NextResponse.json(
			{
				error: "Failed to fetch markets",
				message: error instanceof Error ? error.message : "Unknown error",
			},
			{ status: 500 }
		);
	}
}

