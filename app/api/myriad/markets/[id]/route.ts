// API Route: GET /api/myriad/markets/[id]
import { NextRequest, NextResponse } from "next/server";
import { fetchMyriadMarket } from "@/lib/myriad-client";

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await params;
		const searchParams = request.nextUrl.searchParams;
		const networkId = searchParams.get("networkId");

		if (!networkId) {
			return NextResponse.json(
				{
					error: "Missing parameter",
					message: "networkId query parameter is required",
				},
				{ status: 400 }
			);
		}

		const marketId = Number(id);
		if (isNaN(marketId)) {
			return NextResponse.json(
				{
					error: "Invalid parameter",
					message: "Market ID must be a number",
				},
				{ status: 400 }
			);
		}

		const market = await fetchMyriadMarket(marketId, Number(networkId));

		return NextResponse.json(market);
	} catch (error) {
		console.error("Error fetching Myriad market:", error);

		return NextResponse.json(
			{
				error: "Failed to fetch market",
				message: error instanceof Error ? error.message : "Unknown error",
			},
			{ status: 500 }
		);
	}
}

