// API Route: GET /api/myriad/piastri
// Fetches the Oscar Piastri F1 market specifically
import { NextResponse } from "next/server";
import { fetchOscarPiastriMarket } from "@/lib/myriad-client";

export async function GET() {
	try {
		const market = await fetchOscarPiastriMarket();
		return NextResponse.json(market);
	} catch (error) {
		console.error("Error fetching Oscar Piastri F1 market:", error);

		return NextResponse.json(
			{
				error: "Failed to fetch Oscar Piastri F1 market",
				message: error instanceof Error ? error.message : "Unknown error",
			},
			{ status: 500 }
		);
	}
}

// Enable revalidation every 60 seconds
export const revalidate = 60;

