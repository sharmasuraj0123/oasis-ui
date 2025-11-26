"use client";
import { Info, AlertCircle, CheckCircle, XCircle } from "lucide-react";

interface ExtendedMarketInfoProps {
	myriadData: {
		networkId: number;
		slug: string;
		liquidityPrice: number;
		shares: number;
		voided: boolean;
		resolvedOutcomeId: number;
		inPlay: boolean;
		perpetual: boolean;
		moneyline: boolean;
	};
	volume24h: number;
}

export const ExtendedMarketInfo = ({
	myriadData,
	volume24h,
}: ExtendedMarketInfoProps) => {
	const getNetworkName = (networkId: number) => {
		switch (networkId) {
			case 59141:
				return "Linea Sepolia Testnet";
			case 59144:
				return "Linea Mainnet";
			default:
				return `Network ${networkId}`;
		}
	};

	return (
		<div className="border border-[#eaeaea] rounded-xl p-4 bg-white">
			<h3
				className="text-sm font-bold mb-3"
				style={{ fontFamily: "Space Grotesk" }}
			>
				Market Details
			</h3>
			<div className="space-y-3">
				{/* Network Info */}
				<div className="flex items-start justify-between">
					<div>
						<p
							className="text-xs text-[#9e9e9e] mb-1"
							style={{ fontFamily: "Space Mono" }}
						>
							Network
						</p>
						<p
							className="text-sm font-medium"
							style={{ fontFamily: "Space Grotesk" }}
						>
							{getNetworkName(myriadData.networkId)}
						</p>
					</div>
				</div>

				{/* Slug */}
				<div>
					<p
						className="text-xs text-[#9e9e9e] mb-1"
						style={{ fontFamily: "Space Mono" }}
					>
						Market Slug
					</p>
					<code
						className="text-xs bg-[#f5f5f5] px-2 py-1 rounded break-all block"
						style={{ fontFamily: "Space Mono" }}
					>
						{myriadData.slug}
					</code>
				</div>

				{/* Volume 24h */}
				<div className="flex items-center justify-between">
					<p
						className="text-xs text-[#9e9e9e]"
						style={{ fontFamily: "Space Mono" }}
					>
						Volume (24h)
					</p>
					<p
						className="text-sm font-medium"
						style={{ fontFamily: "Space Grotesk" }}
					>
						${volume24h.toFixed(2)}
					</p>
				</div>

				{/* Liquidity Price */}
				<div className="flex items-center justify-between">
					<p
						className="text-xs text-[#9e9e9e]"
						style={{ fontFamily: "Space Mono" }}
					>
						Liquidity Price
					</p>
					<p
						className="text-sm font-medium"
						style={{ fontFamily: "Space Grotesk" }}
					>
						${myriadData.liquidityPrice.toFixed(5)}
					</p>
				</div>

				{/* Total Shares */}
				<div className="flex items-center justify-between">
					<p
						className="text-xs text-[#9e9e9e]"
						style={{ fontFamily: "Space Mono" }}
					>
						Total Shares
					</p>
					<p
						className="text-sm font-medium"
						style={{ fontFamily: "Space Grotesk" }}
					>
						{myriadData.shares.toFixed(2)}
					</p>
				</div>

				{/* Market Flags */}
				<div className="pt-3 border-t border-[#eaeaea] space-y-2">
					<p
						className="text-xs text-[#9e9e9e] mb-2"
						style={{ fontFamily: "Space Mono" }}
					>
						Market Status
					</p>
					<div className="grid grid-cols-2 gap-2">
						<div
							className={`flex items-center gap-1.5 text-xs px-2 py-1.5 rounded ${
								myriadData.voided
									? "bg-red-50 text-red-700"
									: "bg-green-50 text-green-700"
							}`}
							style={{ fontFamily: "Space Mono" }}
						>
							{myriadData.voided ? (
								<XCircle size={14} />
							) : (
								<CheckCircle size={14} />
							)}
							{myriadData.voided ? "Voided" : "Valid"}
						</div>
						<div
							className={`flex items-center gap-1.5 text-xs px-2 py-1.5 rounded ${
								myriadData.inPlay
									? "bg-blue-50 text-blue-700"
									: "bg-gray-50 text-gray-700"
							}`}
							style={{ fontFamily: "Space Mono" }}
						>
							<Info size={14} />
							{myriadData.inPlay ? "In Play" : "Not In Play"}
						</div>
						{myriadData.perpetual && (
							<div
								className="flex items-center gap-1.5 text-xs px-2 py-1.5 rounded bg-purple-50 text-purple-700"
								style={{ fontFamily: "Space Mono" }}
							>
								<Info size={14} />
								Perpetual
							</div>
						)}
						{myriadData.moneyline && (
							<div
								className="flex items-center gap-1.5 text-xs px-2 py-1.5 rounded bg-orange-50 text-orange-700"
								style={{ fontFamily: "Space Mono" }}
							>
								<Info size={14} />
								Moneyline
							</div>
						)}
					</div>
				</div>

				{/* Resolution Info */}
				{myriadData.resolvedOutcomeId >= 0 && (
					<div className="pt-3 border-t border-[#eaeaea]">
						<p
							className="text-xs text-[#9e9e9e] mb-1"
							style={{ fontFamily: "Space Mono" }}
						>
							Resolved Outcome
						</p>
						<p
							className="text-sm font-medium"
							style={{ fontFamily: "Space Grotesk" }}
						>
							Outcome #{myriadData.resolvedOutcomeId}
						</p>
					</div>
				)}
			</div>
		</div>
	);
};

