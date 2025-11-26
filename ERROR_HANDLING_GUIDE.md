# Error Handling Guide

## 🐛 Common Errors and Solutions

### Error: "missing revert data" or "CALL_EXCEPTION"

**What it means**: The transaction failed before it could even be estimated.

**Common causes**:
1. Token contract doesn't exist on this network
2. You don't have the required tokens
3. Insufficient token balance
4. Wrong network selected

**Solution**:
```
1. Check you're on the correct network:
   - Linea Testnet (59141) for LeBron market
   - Abstract Testnet (11124) for other markets

2. Verify you have the right tokens:
   - Linea: USDC at 0xFEce4462D57bD51A6A552365A011b95f0E16d9B7
   - Abstract: PTS at 0x6cC39C1149aed1fdbf6b11Fd60C18b96446cBc96

3. Check your token balance:
   - Open MetaMask
   - Add token if not visible
   - Request tokens from faucet if balance is 0

4. Ensure you have ETH for gas:
   - Get from Linea/Abstract faucet
   - Need at least 0.01 ETH
```

---

### Error: "Token contract not found"

**What it means**: The app can't find the token contract on your current network.

**Solution**:
1. **Check Network**: Make sure you're on the right network
   - Click MetaMask extension
   - Verify network matches market (Linea/Abstract)
   
2. **Add Token Manually**:
   ```
   MetaMask → Assets → Import Token
   
   For Linea (LeBron market):
   - Address: 0xFEce4462D57bD51A6A552365A011b95f0E16d9B7
   - Symbol: USDC
   - Decimals: 18
   
   For Abstract:
   - Address: 0x6cC39C1149aed1fdbf6b11Fd60C18b96446cBc96
   - Symbol: PTS
   - Decimals: 18
   ```

3. **Verify Contract**:
   - Visit block explorer
   - Paste token address
   - Confirm contract exists

---

### Error: "Insufficient token balance"

**What it means**: You don't have enough USDC/PTS tokens to place the bet.

**Solution**:
1. **Check Balance**:
   - Open MetaMask
   - Look at token balance
   - Compare to bet amount

2. **Get Testnet Tokens**:
   - Visit [GETTING_TESTNET_TOKENS.md](GETTING_TESTNET_TOKENS.md)
   - Request from faucet or Myriad team
   - Wait for tokens to arrive

3. **Reduce Bet Amount**:
   - Try smaller bet (10 USDC instead of 100)
   - Start with minimum to test

---

### Error: "Insufficient ETH for gas"

**What it means**: You don't have enough ETH to pay for the transaction.

**Solution**:
1. **Get More ETH**:
   ```
   Linea: https://faucet.linea.build/
   Abstract: Check Abstract Discord for faucet
   BNB: https://testnet.bnbchain.org/faucet-smart
   ```

2. **Check Gas Balance**:
   - Need at least 0.01 ETH
   - Recommended: 0.1+ ETH

3. **Wait for Pending Transactions**:
   - If you have pending transactions, wait
   - ETH might be reserved for gas

---

### Error: "You rejected the transaction"

**What it means**: You clicked "Reject" in MetaMask.

**Solution**:
1. Try again
2. Click "Confirm" in MetaMask this time
3. Check gas fees are reasonable

---

### Error: "Wrong network"

**What it means**: You're on a different network than the market requires.

**Solution**:
- App will auto-switch networks
- Approve the network switch in MetaMask
- If auto-switch fails, manually change network:
  1. Click MetaMask
  2. Click network dropdown
  3. Select correct network (Linea/Abstract)

---

### Error: "Failed to get quote"

**What it means**: Couldn't fetch price quote from Myriad API.

**Causes**:
- API is down
- Network connectivity issue
- Invalid market parameters

**Solution**:
1. **Check Internet Connection**
2. **Verify API Key** in `.env.local`
3. **Try Again** (temporary API issue)
4. **Check Console** for detailed error
5. **Contact Support** if persists

---

### Error: "Transaction was reverted"

**What it means**: Transaction was sent but failed on-chain.

**Causes**:
- Slippage exceeded
- Market closed
- Insufficient liquidity
- Price moved too much

**Solution**:
1. **Check Market Status**: Is it still open?
2. **Try Smaller Amount**: Reduce bet size
3. **Increase Slippage**: 1% → 2% (advanced)
4. **Wait and Retry**: Price might have moved

---

### Error: "Network not supported"

**What it means**: This market's network isn't configured yet.

**Solution**:
- Try different market
- Only Linea and Abstract are fully supported
- BNB testnet coming soon

---

## 🔍 Debugging Steps

### Step 1: Check Basics
```
✅ MetaMask installed?
✅ Wallet connected?
✅ On correct network?
✅ Have ETH for gas?
✅ Have tokens for betting?
```

### Step 2: Verify Tokens
```
1. Open MetaMask
2. Click "Assets" tab
3. See both ETH and USDC/PTS?
4. Balances > 0?
```

### Step 3: Check Network
```
1. Click MetaMask extension
2. Look at top - network name
3. Should say "Linea Sepolia" or "Abstract Testnet"
4. If not, switch networks
```

### Step 4: Test Connection
```
1. Open browser console (F12)
2. Look for errors
3. Check network tab for failed requests
4. Screenshot and share with support
```

---

## 📊 Error Priority

### Critical (Stop Everything)
1. No MetaMask installed
2. Wrong network entirely
3. No ETH for gas at all

### High (Can't Bet)
1. No betting tokens
2. Insufficient token balance
3. Token contract not found

### Medium (Annoying)
1. Transaction rejected
2. Failed to get quote
3. Slippage exceeded

### Low (Try Again)
1. Network request timeout
2. API temporarily down
3. MetaMask popup closed

---

## 🛠️ Advanced Troubleshooting

### Clear MetaMask Cache
```
1. MetaMask → Settings → Advanced
2. Click "Reset Account"
3. Reconnect to app
4. Try again
```

### Change RPC URL
```
Linea:
- Try: https://rpc.sepolia.linea.build
- Or: https://linea-sepolia.infura.io

Abstract:
- Try: https://api.testnet.abs.xyz
- Check Abstract docs for alternatives
```

### Increase Gas Limit
```javascript
// In betting.ts, change:
gasLimit: 500000 → gasLimit: 800000

// Only if you know what you're doing!
```

### Check Transaction History
```
1. Visit block explorer
2. Paste your wallet address
3. See recent transactions
4. Check if approvals went through
5. Look for failed transactions
```

---

## 📞 Getting Help

### Before Asking for Help

Collect this info:
```
1. Error message (full text)
2. Network you're on (Linea/Abstract/BNB)
3. Transaction hash (if available)
4. What you were trying to do
5. Screenshot of error
6. Browser console errors (F12)
```

### Where to Get Help

1. **Documentation**:
   - Read [GETTING_TESTNET_TOKENS.md](GETTING_TESTNET_TOKENS.md)
   - Check [BETTING_QUICK_START.md](BETTING_QUICK_START.md)
   - Review [BETTING_FUNCTIONALITY.md](BETTING_FUNCTIONALITY.md)

2. **Community**:
   - Linea Discord
   - Abstract Discord
   - Myriad Protocol channels

3. **Support**:
   - Open GitHub issue
   - Contact Myriad team
   - Ask in project Discord

---

## ✅ Prevention Tips

1. **Always Test Small First**
   - Start with 10 USDC
   - Don't bet your entire balance

2. **Keep Extra ETH**
   - Always have 0.1+ ETH for gas
   - Don't use all your ETH

3. **Verify Before Clicking**
   - Check network before betting
   - Verify amount is correct
   - Review potential return

4. **Save Transaction Hashes**
   - Keep record of transactions
   - Useful for debugging
   - Can track on explorer

5. **Monitor Token Balances**
   - Check before each bet
   - Request more from faucet early
   - Don't run out mid-transaction

---

## 🎯 Quick Fixes

| Error | Quick Fix |
|-------|-----------|
| Wrong network | Approve network switch in MetaMask |
| No tokens | Visit faucet, get tokens |
| No ETH | Get ETH from faucet |
| Rejected | Try again, click Confirm |
| Can't find token | Add token manually in MetaMask |
| Transaction failed | Try smaller amount |
| API error | Wait 1 minute, try again |
| MetaMask stuck | Close and reopen MetaMask |

---

## 🔄 Recovery Procedures

### If Transaction is Stuck
```
1. Check on block explorer
2. If pending > 5 min, may need to cancel
3. MetaMask → Activity → Cancel
4. Try again with higher gas
```

### If Approval Failed
```
1. Check transaction hash on explorer
2. If failed, just try again
3. Approval only needs to succeed once
4. Then you can bet multiple times
```

### If You're Completely Stuck
```
1. Disconnect wallet
2. Close MetaMask
3. Restart browser
4. Reconnect wallet
5. Try from beginning
```

---

**Remember**: Most errors are fixable! Follow the steps above and you'll be betting in no time. 🎉

