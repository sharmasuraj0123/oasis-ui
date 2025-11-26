// Myriad Protocol Betting Service
import { Contract, parseUnits } from "ethers";
import { JsonRpcSigner } from "ethers";
import { MyriadMarket } from "../types/myriad";

// Network configurations
export const NETWORK_CONFIG = {
	11124: {
		// Abstract Testnet
		name: "Abstract Testnet",
		rpcUrl: "https://api.testnet.abs.xyz",
		chainId: 11124,
		nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
		blockExplorer: "https://explorer.testnet.abs.xyz",
		predictionMarket: "0x6c44Abf72085E5e71EeB7C951E3079073B1E7312",
		tokens: {
			USDC_E: "0x8820c84FD53663C2e2EA26e7a4c2b79dCc479765",
			PENGU: "0x6ccDDCf494182a3A237ac3f33A303a57961FaF55",
			PTS: "0x6cC39C1149aed1fdbf6b11Fd60C18b96446cBc96",
		},
	},
	59141: {
		// Linea Testnet
		name: "Linea Sepolia",
		rpcUrl: "https://rpc.sepolia.linea.build",
		chainId: 59141,
		nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
		blockExplorer: "https://sepolia.lineascan.build",
		predictionMarket: "0xED5CCb260f80A7EB1E5779B02115b4dc25aA3cDE",
		tokens: {
			USDC: "0xFEce4462D57bD51A6A552365A011b95f0E16d9B7",
		},
	},
	97: {
		// BNB Chain Testnet
		name: "BNB Chain Testnet",
		rpcUrl: "https://data-seed-prebsc-1-s1.binance.org:8545",
		chainId: 97,
		nativeCurrency: { name: "BNB", symbol: "BNB", decimals: 18 },
		blockExplorer: "https://testnet.bscscan.com",
		predictionMarket: "", // Not specified in docs
		tokens: {},
	},
};

// ERC20 ABI (minimal for approve, balance, and allowance checks)
const ERC20_ABI = [
	{
		"constant": true,
		"inputs": [{"name": "_owner", "type": "address"}],
		"name": "balanceOf",
		"outputs": [{"name": "balance", "type": "uint256"}],
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{"name": "_spender", "type": "address"},
			{"name": "_value", "type": "uint256"}
		],
		"name": "approve",
		"outputs": [{"name": "", "type": "bool"}],
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{"name": "_owner", "type": "address"},
			{"name": "_spender", "type": "address"}
		],
		"name": "allowance",
		"outputs": [{"name": "", "type": "uint256"}],
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "decimals",
		"outputs": [{"name": "", "type": "uint8"}],
		"type": "function"
	}
];

// Quote request interface
export interface QuoteRequest {
	market_id: number;
	network_id: number;
	outcome_id: number;
	action: "buy" | "sell";
	value?: number; // For buy - amount of tokens to spend
	shares?: number; // For sell - number of shares to sell
	slippage: number; // e.g., 0.01 for 1%
}

// Quote response interface
export interface QuoteResponse {
	value: number;
	shares: number;
	shares_threshold: number;
	price_average: number;
	price_before: number;
	price_after: number;
	calldata: string;
	net_amount: number;
	fees: {
		treasury: number;
		distributor: number;
		fee: number;
	};
}

/**
 * Get trade quote from Myriad API
 */
export async function getTradeQuote(
	request: QuoteRequest
): Promise<QuoteResponse> {
	const apiKey = process.env.NEXT_PUBLIC_MYRIAD_API_KEY;
	const baseUrl =
		process.env.NEXT_PUBLIC_MYRIAD_API_URL ||
		"https://api-v2.staging.myriadprotocol.com";

	if (!apiKey) {
		throw new Error("Myriad API key not configured");
	}

	console.log("=== MYRIAD API REQUEST ===");
	console.log("Endpoint:", `${baseUrl}/markets/quote`);
	console.log("Method: POST");
	console.log("Request payload:", JSON.stringify(request, null, 2));

	const response = await fetch(`${baseUrl}/markets/quote`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"x-api-key": apiKey,
		},
		body: JSON.stringify(request),
	});

	console.log("Response status:", response.status);
	
	if (!response.ok) {
		const error = await response.json().catch(() => ({}));
		console.log("Response error:", JSON.stringify(error, null, 2));
		throw new Error(
			error.message || `Failed to get quote: ${response.statusText}`
		);
	}

	const responseData = await response.json();
	console.log("Response data:", JSON.stringify(responseData, null, 2));
	console.log("=== END MYRIAD API REQUEST ===");

	return responseData;
}

/**
 * Check if user needs to switch network
 */
export async function switchNetwork(
	networkId: number,
	provider: any
): Promise<boolean> {
	const config = NETWORK_CONFIG[networkId as keyof typeof NETWORK_CONFIG];
	if (!config) {
		throw new Error(`Network ${networkId} not supported`);
	}

	try {
		await provider.send("wallet_switchEthereumChain", [
			{ chainId: `0x${networkId.toString(16)}` },
		]);
		return true;
	} catch (error: any) {
		// Network doesn't exist in MetaMask, add it
		if (error.code === 4902) {
			try {
				await provider.send("wallet_addEthereumChain", [
					{
						chainId: `0x${networkId.toString(16)}`,
						chainName: config.name,
						rpcUrls: [config.rpcUrl],
						nativeCurrency: config.nativeCurrency,
						blockExplorerUrls: [config.blockExplorer],
					},
				]);
				return true;
			} catch (addError) {
				console.error("Failed to add network:", addError);
				throw new Error(`Failed to add ${config.name} to MetaMask`);
			}
		}
		throw error;
	}
}

/**
 * Get token address for a market
 * This is a simplified version - in production, you'd get this from the market data
 */
export function getTokenAddress(networkId: number, market: MyriadMarket): string {
	const config = NETWORK_CONFIG[networkId as keyof typeof NETWORK_CONFIG];
	if (!config) {
		throw new Error(`Network ${networkId} not supported`);
	}

	// For now, use USDC as default for Linea
	if (networkId === 59141) {
		const lineaConfig = NETWORK_CONFIG[59141];
		return lineaConfig.tokens.USDC;
	}

	// For Abstract, use PTS as default
	if (networkId === 11124) {
		const abstractConfig = NETWORK_CONFIG[11124];
		return abstractConfig.tokens.PTS;
	}

	throw new Error("Could not determine token address");
}

/**
 * Get token decimals for a network
 */
export function getTokenDecimals(networkId: number): number {
	// Linea uses USDC (6 decimals)
	if (networkId === 59141) {
		return 6;
	}
	
	// Abstract uses PTS (18 decimals)
	if (networkId === 11124) {
		return 18;
	}
	
	// Default to 18 for unknown tokens
	return 18;
}

/**
 * Check and request token approval if needed
 */
export async function ensureTokenApproval(
	signer: JsonRpcSigner,
	tokenAddress: string,
	spenderAddress: string,
	amount: bigint,
	decimals: number = 18
): Promise<boolean> {
	try {
		console.log("=== TOKEN APPROVAL CHECK ===");
		console.log("Token address:", tokenAddress);
		console.log("Spender address:", spenderAddress);
		console.log("Amount needed (wei):", amount.toString());
		console.log("Decimals:", decimals);
		
		const tokenContract = new Contract(tokenAddress, ERC20_ABI, signer);
		const userAddress = await signer.getAddress();
		console.log("User address:", userAddress);

		// Check if token contract exists
		try {
			const code = await signer.provider.getCode(tokenAddress);
			console.log("Token contract code length:", code.length);
			if (code === "0x") {
				throw new Error(
					`Token contract not found at ${tokenAddress}. Make sure you're on the correct network and have the right token.`
				);
			}
		} catch (error) {
			console.error("Failed to verify token contract:", error);
			throw new Error(
				`Failed to verify token contract. You may not have the required tokens in your wallet.`
			);
		}

		// Check token balance
		let balance: bigint;
		try {
			balance = await tokenContract.balanceOf(userAddress);
			console.log("Token balance (wei):", balance.toString());
			console.log("Token balance (human):", (Number(balance) / Math.pow(10, decimals)).toFixed(decimals));
		} catch (error) {
			console.error("Failed to check balance:", error);
			throw new Error(
				"Failed to check token balance. Make sure you have the required tokens."
			);
		}

		if (balance < amount) {
			console.error("Insufficient balance!");
			console.error("Need:", amount.toString());
			console.error("Have:", balance.toString());
			throw new Error(
				`Insufficient token balance. You need ${amount.toString()} tokens but only have ${balance.toString()}.`
			);
		}

		// Check current allowance
		let allowance: bigint;
		try {
			allowance = await tokenContract.allowance(userAddress, spenderAddress);
			console.log("Current allowance (wei):", allowance.toString());
			console.log("Current allowance (human):", (Number(allowance) / Math.pow(10, decimals)).toFixed(decimals));
		} catch (error) {
			console.error("Failed to check allowance:", error);
			throw new Error("Failed to check token allowance.");
		}

		if (allowance >= amount) {
			console.log("✓ Sufficient allowance already exists");
			console.log("=== END TOKEN APPROVAL CHECK ===");
			return true; // Already approved
		}

		console.log("⚠ Insufficient allowance, requesting approval...");
		// Request approval for a large amount to avoid repeated approvals
		const maxApproval = parseUnits("1000000", decimals); // Approve 1M tokens with correct decimals
		console.log("Requesting approval for:", maxApproval.toString());
		
		const approveTx = await tokenContract.approve(spenderAddress, maxApproval);
		console.log("Approval transaction sent:", approveTx.hash);
		
		const receipt = await approveTx.wait();
		console.log("Approval transaction confirmed:", receipt?.hash);

		if (!receipt || receipt.status === 0) {
			throw new Error("Token approval transaction failed");
		}

		console.log("✓ Approval successful");
		console.log("=== END TOKEN APPROVAL CHECK ===");
		return true;
	} catch (error: any) {
		console.error("Token approval error:", error);

		// Provide user-friendly error messages
		if (error.message?.includes("user rejected")) {
			throw new Error("You rejected the approval transaction");
		} else if (error.message?.includes("insufficient funds")) {
			throw new Error(
				"Insufficient ETH for gas fees. Please add more ETH to your wallet."
			);
		} else if (error.message?.includes("Token contract not found")) {
			throw error; // Already has good message
		} else if (error.message?.includes("Insufficient token balance")) {
			throw error; // Already has good message
		} else {
			throw new Error(
				error.message || "Failed to approve token. Please try again."
			);
		}
	}
}

/**
 * Execute a bet transaction
 */
export async function executeBet(
	signer: JsonRpcSigner,
	market: MyriadMarket,
	outcomeId: number,
	amount: number,
	slippage: number = 0.01
): Promise<string> {
	const networkId = market.networkId;
	const config = NETWORK_CONFIG[networkId as keyof typeof NETWORK_CONFIG];

	if (!config) {
		throw new Error(`Network ${networkId} not supported`);
	}

	if (!config.predictionMarket) {
		throw new Error(
			`Betting is not yet supported on ${config.name}. Please try a different market.`
		);
	}

	try {
		// Step 1: Get quote
		const quoteRequest: QuoteRequest = {
			market_id: market.id,
			network_id: networkId,
			outcome_id: outcomeId,
			action: "buy",
			value: amount,
			slippage,
		};

		let quote: QuoteResponse;
		try {
			quote = await getTradeQuote(quoteRequest);
		} catch (error: any) {
			throw new Error(
				`Failed to get quote: ${error.message || "Please try again"}`
			);
		}

		// Step 2: Get token address and decimals
		const tokenAddress = getTokenAddress(networkId, market);
		const decimals = getTokenDecimals(networkId);
		
		console.log(`Using token ${tokenAddress} with ${decimals} decimals for ${amount} tokens`);

		const amountWei = parseUnits(amount.toString(), decimals);
		console.log(`Amount in wei: ${amountWei.toString()}`);

		// Step 3: Check/approve token
		await ensureTokenApproval(
			signer,
			tokenAddress,
			config.predictionMarket,
			amountWei,
			decimals
		);

		// Verify allowance after approval
		const tokenContract = new Contract(tokenAddress, ERC20_ABI, signer);
		const userAddress = await signer.getAddress();
		const finalAllowance = await tokenContract.allowance(userAddress, config.predictionMarket);
		console.log("Final allowance after approval (wei):", finalAllowance.toString());
		console.log("Final allowance (human):", (Number(finalAllowance) / Math.pow(10, decimals)).toFixed(decimals));

		// Step 4: Execute transaction with calldata from quote
		console.log("=== EXECUTING TRANSACTION ===");
		console.log("To:", config.predictionMarket);
		console.log("Calldata:", quote.calldata);
		console.log("Gas limit: Auto (wallet will estimate)");
		
		let tx;
		try {
			tx = await signer.sendTransaction({
				to: config.predictionMarket,
				data: quote.calldata,
			});
			console.log("Transaction hash:", tx.hash);
		} catch (error: any) {
			console.error("Transaction send error:", error);
			if (error.code === 4001) {
				throw new Error("You rejected the transaction");
			} else if (error.message?.includes("insufficient funds")) {
				throw new Error(
					"Insufficient ETH for gas fees. Please add more ETH to your wallet."
				);
			} else {
				throw new Error(
					error.message || "Transaction failed. Please try again."
				);
			}
		}

		// Step 5: Wait for confirmation
		console.log("Waiting for transaction confirmation...");
		const receipt = await tx.wait();
		console.log("Transaction receipt:", JSON.stringify(receipt, null, 2));

		if (!receipt || receipt.status === 0) {
			console.error("Transaction reverted!");
			throw new Error("Transaction was reverted by the contract");
		}

		console.log("✓ Transaction successful!");
		console.log("=== END EXECUTING TRANSACTION ===");
		return receipt.hash;
	} catch (error: any) {
		console.error("Execute bet error:", error);
		throw error; // Re-throw to be handled by the component
	}
}

/**
 * Get user's portfolio for a network
 */
export async function getUserPortfolio(
	address: string,
	networkId: number
): Promise<any> {
	const apiKey = process.env.NEXT_PUBLIC_MYRIAD_API_KEY;
	const baseUrl =
		process.env.NEXT_PUBLIC_MYRIAD_API_URL ||
		"https://api-v2.staging.myriadprotocol.com";

	if (!apiKey) {
		throw new Error("Myriad API key not configured");
	}

	const url = `${baseUrl}/users/${address}/portfolio?network_id=${networkId}`;
	
	console.log("=== MYRIAD API REQUEST (Portfolio) ===");
	console.log("Endpoint:", url);
	console.log("Method: GET");
	console.log("Address:", address);
	console.log("Network ID:", networkId);

	const response = await fetch(url, {
		headers: {
			"Content-Type": "application/json",
			"x-api-key": apiKey,
		},
	});

	console.log("Response status:", response.status);

	if (!response.ok) {
		const error = await response.text();
		console.log("Response error:", error);
		throw new Error("Failed to fetch portfolio");
	}

	const responseData = await response.json();
	console.log("Response data:", JSON.stringify(responseData, null, 2));
	console.log("=== END MYRIAD API REQUEST (Portfolio) ===");

	return responseData;
}

