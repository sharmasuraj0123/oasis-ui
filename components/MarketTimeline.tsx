"use client";
import { Calendar, Clock, Link as LinkIcon } from "lucide-react";

interface MarketTimelineProps {
	publishedAt: string;
	expiresAt: string;
	resolutionSource?: string;
	resolutionTitle?: string;
}

export const MarketTimeline = ({
	publishedAt,
	expiresAt,
	resolutionSource,
	resolutionTitle,
}: MarketTimelineProps) => {
	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
			timeZoneName: "short",
		});
	};

	return (
		<div className="border border-[#eaeaea] rounded-xl p-4 bg-white">
			<h3
				className="text-sm font-bold mb-3"
				style={{ fontFamily: "Space Grotesk" }}
			>
				Market Timeline
			</h3>
			<div className="space-y-3">
				{/* Published Date */}
				<div className="flex items-start gap-3">
					<Calendar size={16} className="text-[#9e9e9e] mt-0.5 flex-shrink-0" />
					<div className="flex-1">
						<p
							className="text-xs text-[#9e9e9e] mb-0.5"
							style={{ fontFamily: "Space Mono" }}
						>
							Published
						</p>
						<p
							className="text-sm font-medium"
							style={{ fontFamily: "Space Grotesk" }}
						>
							{formatDate(publishedAt)}
						</p>
					</div>
				</div>

				{/* Expiry Date */}
				<div className="flex items-start gap-3">
					<Clock size={16} className="text-[#9e9e9e] mt-0.5 flex-shrink-0" />
					<div className="flex-1">
						<p
							className="text-xs text-[#9e9e9e] mb-0.5"
							style={{ fontFamily: "Space Mono" }}
						>
							Market Close
						</p>
						<p
							className="text-sm font-medium"
							style={{ fontFamily: "Space Grotesk" }}
						>
							{formatDate(expiresAt)}
						</p>
					</div>
				</div>

				{/* Resolution Source */}
				{resolutionSource && (
					<div className="flex items-start gap-3 pt-3 border-t border-[#eaeaea]">
						<LinkIcon
							size={16}
							className="text-[#9e9e9e] mt-0.5 flex-shrink-0"
						/>
						<div className="flex-1">
							<p
								className="text-xs text-[#9e9e9e] mb-0.5"
								style={{ fontFamily: "Space Mono" }}
							>
								Resolution Source
								{resolutionTitle && ` - ${resolutionTitle}`}
							</p>
							<a
								href={resolutionSource}
								target="_blank"
								rel="noopener noreferrer"
								className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline break-all"
								style={{ fontFamily: "Space Grotesk" }}
							>
								{resolutionSource}
							</a>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

