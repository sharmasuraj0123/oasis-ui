import { MarketPage } from "@/components/MarketPage";

const Market = async ({ params }: { params: Promise<{ id: string }> }) => {
	const { id } = await params;
	console.log("ID", id);

	return <MarketPage selectedMarketId={id} />;
};

export default Market;
