"use client";

interface FeeInfoPanelProps {
	fees: {
		buy: {
			fee: number;
			treasury_fee: number;
			distributor_fee: number;
		};
		sell: {
			fee: number;
			treasury_fee: number;
			distributor_fee: number;
		};
		treasury: string;
		distributor: string;
	};
}

export const FeeInfoPanel = ({ fees }: FeeInfoPanelProps) => {
	const formatFee = (fee: number) => {
		return `${(fee * 100).toFixed(2)}%`;
	};

	return (
		<div className="border border-[#eaeaea] rounded-xl p-4 bg-white">
			<h3
				className="text-sm font-bold mb-3"
				style={{ fontFamily: "Space Grotesk" }}
			>
				Fee Structure
			</h3>
			<div className="space-y-4">
				{/* Buy Fees */}
				<div>
					<p
						className="text-xs text-[#9e9e9e] mb-2 font-semibold"
						style={{ fontFamily: "Space Mono" }}
					>
						BUY FEES
					</p>
					<div className="space-y-1.5">
						<div className="flex items-center justify-between">
							<span
								className="text-xs text-[#6e6e6e]"
								style={{ fontFamily: "Space Mono" }}
							>
								Total Fee
							</span>
							<span
								className="text-xs font-medium"
								style={{ fontFamily: "Space Grotesk" }}
							>
								{formatFee(fees.buy.fee)}
							</span>
						</div>
						<div className="flex items-center justify-between">
							<span
								className="text-xs text-[#6e6e6e]"
								style={{ fontFamily: "Space Mono" }}
							>
								Treasury Fee
							</span>
							<span
								className="text-xs font-medium"
								style={{ fontFamily: "Space Grotesk" }}
							>
								{formatFee(fees.buy.treasury_fee)}
							</span>
						</div>
						<div className="flex items-center justify-between">
							<span
								className="text-xs text-[#6e6e6e]"
								style={{ fontFamily: "Space Mono" }}
							>
								Distributor Fee
							</span>
							<span
								className="text-xs font-medium"
								style={{ fontFamily: "Space Grotesk" }}
							>
								{formatFee(fees.buy.distributor_fee)}
							</span>
						</div>
					</div>
				</div>

				{/* Sell Fees */}
				<div>
					<p
						className="text-xs text-[#9e9e9e] mb-2 font-semibold"
						style={{ fontFamily: "Space Mono" }}
					>
						SELL FEES
					</p>
					<div className="space-y-1.5">
						<div className="flex items-center justify-between">
							<span
								className="text-xs text-[#6e6e6e]"
								style={{ fontFamily: "Space Mono" }}
							>
								Total Fee
							</span>
							<span
								className="text-xs font-medium"
								style={{ fontFamily: "Space Grotesk" }}
							>
								{formatFee(fees.sell.fee)}
							</span>
						</div>
						<div className="flex items-center justify-between">
							<span
								className="text-xs text-[#6e6e6e]"
								style={{ fontFamily: "Space Mono" }}
							>
								Treasury Fee
							</span>
							<span
								className="text-xs font-medium"
								style={{ fontFamily: "Space Grotesk" }}
							>
								{formatFee(fees.sell.treasury_fee)}
							</span>
						</div>
						<div className="flex items-center justify-between">
							<span
								className="text-xs text-[#6e6e6e]"
								style={{ fontFamily: "Space Mono" }}
							>
								Distributor Fee
							</span>
							<span
								className="text-xs font-medium"
								style={{ fontFamily: "Space Grotesk" }}
							>
								{formatFee(fees.sell.distributor_fee)}
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

