# Future Wallet Integration Enhancements

This document outlines potential enhancements to integrate wallet functionality more deeply into the betting flow.

## Current State

✅ **Completed:**
- Wallet connection/disconnection via MetaMask
- Global wallet state management
- Auto-reconnect on page reload
- Account and network change detection
- User-friendly toast notifications
- Portfolio page wallet requirement

## Future Enhancements

### 1. Wallet Balance Display

**Location:** Navbar, Portfolio page, BettingModal

**Implementation:**
```typescript
// In WalletContext.tsx - Add balance fetching
const [balance, setBalance] = useState<string | null>(null);

useEffect(() => {
  if (provider && account) {
    const fetchBalance = async () => {
      const balance = await provider.getBalance(account);
      setBalance(ethers.formatEther(balance));
    };
    fetchBalance();
  }
}, [provider, account]);
```

**Display in Navbar:**
```typescript
{isConnected && account && (
  <div className="flex items-center gap-2">
    <span>{balance} ETH</span>
    <span>{shortenAddress(account)}</span>
  </div>
)}
```

### 2. Check Wallet Connection Before Betting

**Location:** BettingModal.tsx

**Implementation:**
```typescript
import { useWallet } from "@/lib/WalletContext";

export function BettingModal({ ... }: BettingModalProps) {
  const { isConnected, connectWallet, account } = useWallet();
  
  const handlePlaceBet = async () => {
    // Check if wallet is connected
    if (!isConnected) {
      toast.error("Wallet not connected", {
        description: "Please connect your wallet to place a bet",
        action: {
          label: "Connect",
          onClick: connectWallet
        }
      });
      return;
    }
    
    // Proceed with existing bet logic
    // ... existing code
  };
  
  // Show wallet connection prompt in modal if not connected
  if (!isConnected) {
    return (
      <div className="modal-content">
        <div className="text-center p-8">
          <Wallet size={48} className="mx-auto mb-4" />
          <h3>Connect Wallet to Place Bet</h3>
          <button onClick={connectWallet}>
            Connect Wallet
          </button>
        </div>
      </div>
    );
  }
  
  // ... rest of modal
}
```

### 3. Actual On-Chain Transactions

**Location:** BettingModal.tsx or new `lib/contracts.ts`

**Smart Contract Integration:**
```typescript
// lib/contracts.ts
import { ethers } from "ethers";
import { useWallet } from "./WalletContext";

const BETTING_CONTRACT_ADDRESS = "0x..."; // Your contract address
const BETTING_CONTRACT_ABI = [...]; // Your contract ABI

export function useBettingContract() {
  const { signer } = useWallet();
  
  const placeBet = async (
    marketId: string,
    outcome: "YES" | "NO",
    amount: string
  ) => {
    if (!signer) throw new Error("No signer available");
    
    const contract = new ethers.Contract(
      BETTING_CONTRACT_ADDRESS,
      BETTING_CONTRACT_ABI,
      signer
    );
    
    // Convert USDC amount to proper units
    const amountInWei = ethers.parseUnits(amount, 6); // USDC has 6 decimals
    
    // Call contract method
    const tx = await contract.placeBet(marketId, outcome === "YES" ? 1 : 0, {
      value: amountInWei
    });
    
    // Wait for confirmation
    const receipt = await tx.wait();
    
    return receipt;
  };
  
  return { placeBet };
}
```

**Usage in BettingModal:**
```typescript
import { useBettingContract } from "@/lib/contracts";

export function BettingModal({ ... }: BettingModalProps) {
  const { placeBet } = useBettingContract();
  
  const handlePlaceBet = async () => {
    if (!selectedOutcome || !betAmount) return;
    
    setIsProcessing(true);
    setTxStatus("confirming");
    
    try {
      // Show MetaMask popup for user to confirm
      const receipt = await placeBet(
        currentMarket.id,
        selectedOutcome,
        betAmount
      );
      
      setTxStatus("confirmed");
      
      toast.success("Bet placed successfully!", {
        description: `Transaction: ${receipt.hash.slice(0, 10)}...`,
      });
      
      // Update local state, refetch user bets, etc.
      
    } catch (error: any) {
      console.error("Bet placement failed:", error);
      
      if (error.code === 4001) {
        toast.error("Transaction Rejected", {
          description: "You rejected the transaction in MetaMask"
        });
      } else if (error.code === -32603) {
        toast.error("Insufficient Balance", {
          description: "You don't have enough funds for this bet"
        });
      } else {
        toast.error("Transaction Failed", {
          description: error.message || "Please try again"
        });
      }
    } finally {
      setIsProcessing(false);
      setTxStatus("idle");
    }
  };
}
```

### 4. USDC Token Approval

**Location:** BettingModal.tsx or lib/contracts.ts

**Implementation:**
```typescript
const USDC_ADDRESS = "0x..."; // USDC contract address
const ERC20_ABI = [...]; // Standard ERC20 ABI

export function useUSDC() {
  const { signer, account } = useWallet();
  
  const checkAllowance = async () => {
    if (!signer || !account) return "0";
    
    const usdcContract = new ethers.Contract(
      USDC_ADDRESS,
      ERC20_ABI,
      signer
    );
    
    const allowance = await usdcContract.allowance(
      account,
      BETTING_CONTRACT_ADDRESS
    );
    
    return ethers.formatUnits(allowance, 6);
  };
  
  const approveUSDC = async (amount: string) => {
    if (!signer) throw new Error("No signer");
    
    const usdcContract = new ethers.Contract(
      USDC_ADDRESS,
      ERC20_ABI,
      signer
    );
    
    const amountInWei = ethers.parseUnits(amount, 6);
    const tx = await usdcContract.approve(
      BETTING_CONTRACT_ADDRESS,
      amountInWei
    );
    
    await tx.wait();
  };
  
  const getBalance = async () => {
    if (!signer || !account) return "0";
    
    const usdcContract = new ethers.Contract(
      USDC_ADDRESS,
      ERC20_ABI,
      signer
    );
    
    const balance = await usdcContract.balanceOf(account);
    return ethers.formatUnits(balance, 6);
  };
  
  return { checkAllowance, approveUSDC, getBalance };
}
```

**Two-Step Betting Flow:**
```typescript
const { approveUSDC, checkAllowance, getBalance } = useUSDC();
const { placeBet } = useBettingContract();

const handlePlaceBet = async () => {
  try {
    // 1. Check USDC balance
    const balance = await getBalance();
    if (parseFloat(balance) < parseFloat(betAmount)) {
      toast.error("Insufficient USDC balance");
      return;
    }
    
    // 2. Check allowance
    const allowance = await checkAllowance();
    if (parseFloat(allowance) < parseFloat(betAmount)) {
      // Need approval first
      setTxStatus("confirming");
      toast.info("Please approve USDC spending");
      
      await approveUSDC(betAmount);
      
      toast.success("USDC approved!");
    }
    
    // 3. Place bet
    setTxStatus("confirming");
    toast.info("Confirm bet in MetaMask");
    
    const receipt = await placeBet(
      currentMarket.id,
      selectedOutcome,
      betAmount
    );
    
    setTxStatus("confirmed");
    toast.success("Bet placed!");
    
  } catch (error) {
    // Error handling
  }
};
```

### 5. Network Validation

**Location:** WalletContext.tsx or BettingModal.tsx

**Implementation:**
```typescript
const REQUIRED_CHAIN_ID = 1; // Ethereum Mainnet
const CHAIN_NAMES = {
  1: "Ethereum Mainnet",
  5: "Goerli Testnet",
  137: "Polygon",
  // ... more chains
};

export function useNetworkValidation() {
  const { chainId, provider } = useWallet();
  
  const isCorrectNetwork = chainId === REQUIRED_CHAIN_ID;
  
  const switchNetwork = async () => {
    if (!provider) return;
    
    try {
      await provider.send("wallet_switchEthereumChain", [
        { chainId: `0x${REQUIRED_CHAIN_ID.toString(16)}` }
      ]);
    } catch (error: any) {
      if (error.code === 4902) {
        // Chain not added to MetaMask
        toast.error("Network not found in MetaMask");
      }
    }
  };
  
  return { isCorrectNetwork, switchNetwork, requiredChainName: CHAIN_NAMES[REQUIRED_CHAIN_ID] };
}

// In BettingModal
const { isCorrectNetwork, switchNetwork, requiredChainName } = useNetworkValidation();

if (!isCorrectNetwork) {
  return (
    <div className="modal-warning">
      <p>Please switch to {requiredChainName}</p>
      <button onClick={switchNetwork}>Switch Network</button>
    </div>
  );
}
```

### 6. Transaction Status Tracking

**Location:** New component or BettingModal.tsx

**Implementation:**
```typescript
const [txHash, setTxHash] = useState<string | null>(null);

const handlePlaceBet = async () => {
  // ... existing code
  
  const tx = await contract.placeBet(...);
  setTxHash(tx.hash);
  
  // Wait for confirmations
  const receipt = await tx.wait(2); // Wait for 2 confirmations
  
  // ... rest of code
};

// Display transaction link
{txHash && (
  <a 
    href={`https://etherscan.io/tx/${txHash}`}
    target="_blank"
    rel="noopener noreferrer"
  >
    View on Etherscan
  </a>
)}
```

### 7. Gas Estimation

**Location:** BettingModal.tsx

**Implementation:**
```typescript
const [estimatedGas, setEstimatedGas] = useState<string | null>(null);

const estimateGas = async () => {
  if (!signer || !betAmount || !selectedOutcome) return;
  
  try {
    const contract = new ethers.Contract(
      BETTING_CONTRACT_ADDRESS,
      BETTING_CONTRACT_ABI,
      signer
    );
    
    const gasLimit = await contract.placeBet.estimateGas(
      currentMarket.id,
      selectedOutcome === "YES" ? 1 : 0,
      ethers.parseUnits(betAmount, 6)
    );
    
    const gasPrice = await signer.provider.getFeeData();
    const estimatedCost = gasLimit * (gasPrice.gasPrice || 0n);
    
    setEstimatedGas(ethers.formatEther(estimatedCost));
  } catch (error) {
    console.error("Gas estimation failed:", error);
  }
};

// Run when bet amount or outcome changes
useEffect(() => {
  estimateGas();
}, [betAmount, selectedOutcome]);

// Display gas estimate
{estimatedGas && (
  <div className="text-sm text-gray-600">
    Estimated gas: ~{parseFloat(estimatedGas).toFixed(6)} ETH
  </div>
)}
```

### 8. Loading States & Better UX

**Implementation:**
```typescript
type TxStep = "idle" | "approving" | "approved" | "confirming" | "confirmed" | "error";

const [txStep, setTxStep] = useState<TxStep>("idle");

const getButtonText = () => {
  switch (txStep) {
    case "approving": return "Approving USDC...";
    case "approved": return "USDC Approved ✓";
    case "confirming": return "Confirm in MetaMask...";
    case "confirmed": return "Bet Placed ✓";
    case "error": return "Try Again";
    default: return "Place Bet";
  }
};

<button disabled={txStep !== "idle" && txStep !== "error"}>
  {getButtonText()}
</button>
```

## Summary

These enhancements would transform the current wallet connection feature into a full Web3 betting platform with:

1. **Balance checks** - Ensure users have enough funds
2. **Token approvals** - Handle ERC20 token spending
3. **Network validation** - Ensure users are on the correct blockchain
4. **Transaction tracking** - Monitor and display transaction status
5. **Gas estimation** - Show users expected costs
6. **Error handling** - Handle all possible blockchain errors
7. **Better UX** - Clear loading states and helpful messages

## Required Before Implementation

1. **Smart Contract Deployment**
   - Deploy betting contract to blockchain
   - Deploy or connect to USDC token contract
   - Get contract addresses and ABIs

2. **Backend Integration**
   - API to sync on-chain data with database
   - Indexer to track all bets and outcomes
   - Oracle for market resolution

3. **Testing**
   - Test on testnet (Goerli, Sepolia, etc.)
   - Comprehensive error scenario testing
   - Gas optimization

4. **Security Audit**
   - Smart contract audit
   - Frontend security review
   - Access control verification

