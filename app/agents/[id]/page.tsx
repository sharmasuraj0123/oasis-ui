const AgentPage = async ({ params }: { params: Promise<{ id: string }> }) => {
	const { id } = await params;
	return <div>AgentPage</div>;
};

export default AgentPage;
