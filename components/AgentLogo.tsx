import { ReactElement } from "react";

interface AgentLogoProps {
	agentId: string;
	size?: number;
}

export function AgentLogo({ agentId, size = 64 }: AgentLogoProps) {
	const logos: Record<string, ReactElement> = {
		// GTrader - Cyan/Green grid pattern
		gtrader: (
			<svg
				width={size}
				height={size}
				viewBox="0 0 64 64"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<rect width="64" height="64" rx="12" fill="url(#gradient-gtrader)" />
				<g opacity="0.9">
					<line
						x1="16"
						y1="16"
						x2="48"
						y2="16"
						stroke="white"
						strokeWidth="2"
					/>
					<line
						x1="16"
						y1="24"
						x2="48"
						y2="24"
						stroke="white"
						strokeWidth="2"
					/>
					<line
						x1="16"
						y1="32"
						x2="48"
						y2="32"
						stroke="white"
						strokeWidth="2.5"
					/>
					<line
						x1="16"
						y1="40"
						x2="48"
						y2="40"
						stroke="white"
						strokeWidth="2"
					/>
					<line
						x1="16"
						y1="48"
						x2="48"
						y2="48"
						stroke="white"
						strokeWidth="2"
					/>
					<line
						x1="16"
						y1="16"
						x2="16"
						y2="48"
						stroke="white"
						strokeWidth="2"
					/>
					<line
						x1="24"
						y1="16"
						x2="24"
						y2="48"
						stroke="white"
						strokeWidth="2"
					/>
					<line
						x1="32"
						y1="16"
						x2="32"
						y2="48"
						stroke="white"
						strokeWidth="2.5"
					/>
					<line
						x1="40"
						y1="16"
						x2="40"
						y2="48"
						stroke="white"
						strokeWidth="2"
					/>
					<line
						x1="48"
						y1="16"
						x2="48"
						y2="48"
						stroke="white"
						strokeWidth="2"
					/>
				</g>
				<circle cx="32" cy="32" r="6" fill="white" />
				<defs>
					<linearGradient id="gradient-gtrader" x1="0" y1="0" x2="64" y2="64">
						<stop offset="0%" stopColor="#22D3EE" />
						<stop offset="100%" stopColor="#10B981" />
					</linearGradient>
				</defs>
			</svg>
		),

		// Pendle Router - Purple/Pink yield curve
		"pendle-router": (
			<svg
				width={size}
				height={size}
				viewBox="0 0 64 64"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<rect width="64" height="64" rx="12" fill="url(#gradient-pendle)" />
				<path
					d="M12 48 Q20 40, 28 36 T44 32 Q50 30, 52 24"
					stroke="white"
					strokeWidth="3"
					fill="none"
					opacity="0.9"
					strokeLinecap="round"
				/>
				<path
					d="M12 42 Q20 36, 28 33 T44 30 Q50 28, 52 22"
					stroke="white"
					strokeWidth="2.5"
					fill="none"
					opacity="0.6"
					strokeLinecap="round"
				/>
				<circle cx="28" cy="36" r="4" fill="white" />
				<circle cx="44" cy="32" r="4" fill="white" />
				<path d="M48 28 L52 24 L48 24 Z" fill="white" />
				<defs>
					<linearGradient id="gradient-pendle" x1="0" y1="0" x2="64" y2="64">
						<stop offset="0%" stopColor="#C084FC" />
						<stop offset="100%" stopColor="#9333EA" />
					</linearGradient>
				</defs>
			</svg>
		),

		// Ember - Red/Orange flame pattern
		beta: (
			<svg
				width={size}
				height={size}
				viewBox="0 0 64 64"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<rect width="64" height="64" rx="12" fill="url(#gradient-beta)" />
				<path
					d="M32 12 C38 20, 40 28, 40 36 C40 44, 36 50, 32 52 C28 50, 24 44, 24 36 C24 28, 26 20, 32 12 Z"
					fill="white"
					opacity="0.3"
				/>
				<path
					d="M32 20 C36 26, 37 32, 37 38 C37 44, 34 48, 32 49 C30 48, 27 44, 27 38 C27 32, 28 26, 32 20 Z"
					fill="white"
					opacity="0.5"
				/>
				<path
					d="M32 26 C34 30, 34.5 34, 34.5 38 C34.5 42, 33 45, 32 46 C31 45, 29.5 42, 29.5 38 C29.5 34, 30 30, 32 26 Z"
					fill="white"
				/>
				<defs>
					<linearGradient id="gradient-beta" x1="0" y1="0" x2="64" y2="64">
						<stop offset="0%" stopColor="#F87171" />
						<stop offset="100%" stopColor="#DC2626" />
					</linearGradient>
				</defs>
			</svg>
		),
	};

	// Fallback logo for unknown agents
	const fallbackLogo = (
		<svg
			width={size}
			height={size}
			viewBox="0 0 64 64"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<rect width="64" height="64" rx="12" fill="#9CA3AF" />
			<circle cx="32" cy="32" r="12" fill="white" opacity="0.9" />
		</svg>
	);

	return logos[agentId] || fallbackLogo;
}
