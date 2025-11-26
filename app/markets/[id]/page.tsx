import { MarketPage } from "@/components/MarketPage";
import { getMarketById } from "@/dal/market";
import { notFound } from "next/navigation";

const Market = async ({ params }: { params: Promise<{ id: string }> }) => {
	const { id } = await params;
	
	// Fetch the market data server-side
	const market = await getMarketById(id);
	
	// If market doesn't exist, show 404
	if (!market) {
		notFound();
	}

	return <MarketPage selectedMarketId={id} initialMarket={market} />;
};

export default Market;
