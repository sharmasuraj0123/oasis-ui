// API Route: GET /api/myriad/markets/[id]/events
import { NextRequest, NextResponse } from "next/server";
import { fetchMyriadMarketEvents } from "@/lib/myriad-client";

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

		const queryParams = {
			limit: searchParams.get("limit") ? Number(searchParams.get("limit")) : undefined,
			page: searchParams.get("page") ? Number(searchParams.get("page")) : undefined,
		};

		const events = await fetchMyriadMarketEvents(
			marketId,
			Number(networkId),
			queryParams
		);

		return NextResponse.json(events);
	} catch (error) {
		console.error("Error fetching Myriad market events:", error);

		return NextResponse.json(
			{
				error: "Failed to fetch market events",
				message: error instanceof Error ? error.message : "Unknown error",
			},
			{ status: 500 }
		);
	}
}

