"use client";

import { useWallet } from "@/lib/WalletContext";
import { Wallet, Copy, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface WalletInfoProps {
	showBalance?: boolean;
	className?: string;
}

export function WalletInfo({ showBalance = false, className = "" }: WalletInfoProps) {
	const { account, isConnected, chainId } = useWallet();
	const [copied, setCopied] = useState(false);

	if (!isConnected || !account) {
		return null;
	}

	const shortenAddress = (address: string) => {
		return `${address.slice(0, 6)}...${address.slice(-4)}`;
	};

	const copyAddress = () => {
		navigator.clipboard.writeText(account);
		setCopied(true);
		toast.success("Address Copied", {
			description: "Wallet address copied to clipboard",
		});
		setTimeout(() => setCopied(false), 2000);
	};

	const getNetworkName = (chainId: number | null) => {
		if (!chainId) return "Unknown";
		const networks: { [key: number]: string } = {
			1: "Ethereum Mainnet",
			5: "Goerli Testnet",
			11155111: "Sepolia Testnet",
			137: "Polygon Mainnet",
			80001: "Mumbai Testnet",
			56: "BSC Mainnet",
			97: "BSC Testnet",
			42161: "Arbitrum One",
			421613: "Arbitrum Goerli",
			10: "Optimism",
			420: "Optimism Goerli",
		};
		return networks[chainId] || `Chain ID: ${chainId}`;
	};

	return (
		<div className={`flex flex-col gap-2 p-4 border-2 border-[#eaeaea] rounded-xl bg-[#fafafa] ${className}`}>
			<div className="flex items-center gap-2 text-sm text-[#666]" style={{ fontFamily: "Space Mono" }}>
				<Wallet size={14} />
				<span>Connected Wallet</span>
			</div>
			
			<div className="flex items-center justify-between gap-2">
				<div className="flex flex-col">
					<span 
						className="font-medium text-black"
						style={{ fontFamily: "Space Grotesk", fontSize: "16px" }}
					>
						{shortenAddress(account)}
					</span>
					{chainId && (
						<span 
							className="text-xs text-[#999]"
							style={{ fontFamily: "Space Mono" }}
						>
							{getNetworkName(chainId)}
						</span>
					)}
				</div>
				
				<button
					onClick={copyAddress}
					className="p-2 hover:bg-white rounded-lg transition-colors"
					title="Copy address"
				>
					{copied ? (
						<Check size={16} className="text-[#00F28F]" />
					) : (
						<Copy size={16} className="text-[#666]" />
					)}
				</button>
			</div>
		</div>
	);
}

