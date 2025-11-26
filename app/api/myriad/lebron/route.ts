// API Route: GET /api/myriad/lebron
// Fetches the LeBron James market specifically
import { NextResponse } from "next/server";
import { fetchLeBronJamesMarket } from "@/lib/myriad-client";

export async function GET() {
	try {
		const market = await fetchLeBronJamesMarket();
		return NextResponse.json(market);
	} catch (error) {
		console.error("Error fetching LeBron James market:", error);

		return NextResponse.json(
			{
				error: "Failed to fetch LeBron James market",
				message: error instanceof Error ? error.message : "Unknown error",
			},
			{ status: 500 }
		);
	}
}

// Enable revalidation every 60 seconds
export const revalidate = 60;

