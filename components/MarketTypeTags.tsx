interface MarketTypeTagProps {
	emoji: string;
	label: string;
	color: string;
	className?: string;
}

export function MarketTypeTag({
	emoji,
	label,
	color,
	className = "",
}: MarketTypeTagProps) {
	return (
		<div
			className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full ${className}`}
			style={{
				backgroundColor: `${color}30`,
				fontFamily: "Space Mono",
				fontSize: "10px",
				lineHeight: "16px",
				fontWeight: "600",
			}}
		>
			<span>{emoji}</span>
			<span style={{ color }}>{label}</span>
		</div>
	);
}
