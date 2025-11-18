import { AgentLogo } from "./AgentLogo";

interface AgentLogoWrapperProps {
	agentId: string;
	size?: "small" | "medium" | "large";
}

export function AgentLogoWrapper({
	agentId,
	size = "medium",
}: AgentLogoWrapperProps) {
	const sizeMap = {
		small: 40,
		medium: 56,
		large: 96,
	};

	return (
		<div className="flex items-center justify-center">
			<AgentLogo agentId={agentId} size={sizeMap[size]} />
		</div>
	);
}
