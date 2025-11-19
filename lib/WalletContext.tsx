"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { BrowserProvider, JsonRpcSigner } from "ethers";
import { toast } from "sonner";

interface WalletContextType {
	account: string | null;
	isConnected: boolean;
	isConnecting: boolean;
	connectWallet: () => Promise<void>;
	disconnectWallet: () => void;
	provider: BrowserProvider | null;
	signer: JsonRpcSigner | null;
	chainId: number | null;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

interface WalletProviderProps {
	children: ReactNode;
}

declare global {
	interface Window {
		ethereum?: any;
	}
}

export function WalletProvider({ children }: WalletProviderProps) {
	const [account, setAccount] = useState<string | null>(null);
	const [provider, setProvider] = useState<BrowserProvider | null>(null);
	const [signer, setSigner] = useState<JsonRpcSigner | null>(null);
	const [chainId, setChainId] = useState<number | null>(null);
	const [isConnecting, setIsConnecting] = useState(false);

	// Check if MetaMask is installed
	const isMetaMaskInstalled = () => {
		return typeof window !== "undefined" && typeof window.ethereum !== "undefined";
	};

	// Connect wallet function
	const connectWallet = async () => {
		if (!isMetaMaskInstalled()) {
			toast.error("MetaMask not detected", {
				description: "Please install MetaMask to connect your wallet.",
				action: {
					label: "Install",
					onClick: () => window.open("https://metamask.io/download/", "_blank"),
				},
			});
			return;
		}

		setIsConnecting(true);

		try {
			const browserProvider = new BrowserProvider(window.ethereum);
			
			// Request account access
			const accounts = await browserProvider.send("eth_requestAccounts", []);
			
			if (accounts.length > 0) {
				const userAccount = accounts[0];
				const userSigner = await browserProvider.getSigner();
				const network = await browserProvider.getNetwork();
				
				setAccount(userAccount);
				setProvider(browserProvider);
				setSigner(userSigner);
				setChainId(Number(network.chainId));
				
				// Store connection state in localStorage
				localStorage.setItem("walletConnected", "true");
				
				toast.success("Wallet Connected", {
					description: `Connected to ${userAccount.slice(0, 6)}...${userAccount.slice(-4)}`,
				});
			}
		} catch (error: any) {
			console.error("Failed to connect wallet:", error);
			
			if (error.code === 4001) {
				toast.error("Connection Rejected", {
					description: "You rejected the connection request.",
				});
			} else {
				toast.error("Connection Failed", {
					description: "Failed to connect to MetaMask. Please try again.",
				});
			}
		} finally {
			setIsConnecting(false);
		}
	};

	// Disconnect wallet function
	const disconnectWallet = () => {
		setAccount(null);
		setProvider(null);
		setSigner(null);
		setChainId(null);
		localStorage.removeItem("walletConnected");
		
		toast.success("Wallet Disconnected", {
			description: "Your wallet has been disconnected.",
		});
	};

	// Handle account changes
	useEffect(() => {
		if (!isMetaMaskInstalled()) return;

		const handleAccountsChanged = (accounts: string[]) => {
			if (accounts.length === 0) {
				// User disconnected their wallet
				disconnectWallet();
			} else if (accounts[0] !== account) {
				// User switched accounts
				setAccount(accounts[0]);
				toast.info("Account Changed", {
					description: `Switched to ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`,
				});
			}
		};

		const handleChainChanged = (chainIdHex: string) => {
			const newChainId = parseInt(chainIdHex, 16);
			setChainId(newChainId);
			toast.info("Network Changed", {
				description: `Switched to chain ID ${newChainId}`,
			});
			// Reload the page as recommended by MetaMask
			window.location.reload();
		};

		window.ethereum.on("accountsChanged", handleAccountsChanged);
		window.ethereum.on("chainChanged", handleChainChanged);

		return () => {
			if (window.ethereum.removeListener) {
				window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
				window.ethereum.removeListener("chainChanged", handleChainChanged);
			}
		};
	}, [account]);

	// Auto-connect on mount if previously connected
	useEffect(() => {
		const wasConnected = localStorage.getItem("walletConnected");
		
		if (wasConnected === "true" && isMetaMaskInstalled()) {
			const autoConnect = async () => {
				try {
					const browserProvider = new BrowserProvider(window.ethereum);
					const accounts = await browserProvider.send("eth_accounts", []);
					
					if (accounts.length > 0) {
						const userAccount = accounts[0];
						const userSigner = await browserProvider.getSigner();
						const network = await browserProvider.getNetwork();
						
						setAccount(userAccount);
						setProvider(browserProvider);
						setSigner(userSigner);
						setChainId(Number(network.chainId));
					} else {
						localStorage.removeItem("walletConnected");
					}
				} catch (error) {
					console.error("Auto-connect failed:", error);
					localStorage.removeItem("walletConnected");
				}
			};

			autoConnect();
		}
	}, []);

	const value: WalletContextType = {
		account,
		isConnected: !!account,
		isConnecting,
		connectWallet,
		disconnectWallet,
		provider,
		signer,
		chainId,
	};

	return (
		<WalletContext.Provider value={value}>
			{children}
		</WalletContext.Provider>
	);
}

export function useWallet() {
	const context = useContext(WalletContext);
	if (context === undefined) {
		throw new Error("useWallet must be used within a WalletProvider");
	}
	return context;
}

