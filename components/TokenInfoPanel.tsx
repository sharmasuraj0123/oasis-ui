"use client";
import { Copy, ExternalLink, Check } from "lucide-react";
import { useState } from "react";

interface TokenInfoPanelProps {
	token: {
		name: string;
		address: string;
		symbol: string;
		decimals: number;
	};
	networkId: number;
}

export const TokenInfoPanel = ({ token, networkId }: TokenInfoPanelProps) => {
	const [copied, setCopied] = useState(false);

	const handleCopyAddress = () => {
		navigator.clipboard.writeText(token.address);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const getExplorerUrl = () => {
		if (networkId === 59141) {
			// Linea Testnet
			return `https://sepolia.lineascan.build/address/${token.address}`;
		}
		return null;
	};

	const explorerUrl = getExplorerUrl();

	return (
		<div className="border border-[#eaeaea] rounded-xl p-4 bg-white">
			<h3
				className="text-sm font-bold mb-3"
				style={{ fontFamily: "Space Grotesk" }}
			>
				Token Information
			</h3>
			<div className="space-y-3">
				<div className="flex items-start justify-between">
					<div className="flex-1">
						<p
							className="text-xs text-[#9e9e9e] mb-1"
							style={{ fontFamily: "Space Mono" }}
						>
							Token
						</p>
						<p
							className="text-sm font-medium"
							style={{ fontFamily: "Space Grotesk" }}
						>
							{token.name} ({token.symbol})
						</p>
					</div>
				</div>

				<div>
					<p
						className="text-xs text-[#9e9e9e] mb-1"
						style={{ fontFamily: "Space Mono" }}
					>
						Contract Address
					</p>
					<div className="flex items-center gap-2">
						<code
							className="text-xs bg-[#f5f5f5] px-2 py-1 rounded flex-1 break-all"
							style={{ fontFamily: "Space Mono" }}
						>
							{token.address.slice(0, 10)}...{token.address.slice(-8)}
						</code>
						<button
							onClick={handleCopyAddress}
							className="p-1.5 hover:bg-[#f5f5f5] rounded transition-colors flex-shrink-0"
							aria-label="Copy address"
						>
							{copied ? (
								<Check size={16} className="text-green-600" />
							) : (
								<Copy size={16} className="text-[#9e9e9e]" />
							)}
						</button>
						{explorerUrl && (
							<a
								href={explorerUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="p-1.5 hover:bg-[#f5f5f5] rounded transition-colors flex-shrink-0"
								aria-label="View on explorer"
							>
								<ExternalLink size={16} className="text-[#9e9e9e]" />
							</a>
						)}
					</div>
				</div>

				<div className="flex items-center justify-between">
					<div>
						<p
							className="text-xs text-[#9e9e9e] mb-1"
							style={{ fontFamily: "Space Mono" }}
						>
							Decimals
						</p>
						<p
							className="text-sm font-medium"
							style={{ fontFamily: "Space Grotesk" }}
						>
							{token.decimals}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

