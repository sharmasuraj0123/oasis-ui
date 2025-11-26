# Quick Start: Place Your First Bet

## 🎯 5-Minute Guide to Betting on Oasis

### Prerequisites
- ✅ MetaMask installed
- ✅ Testnet ETH for gas
- ✅ Testnet USDC tokens

---

## Step 1: Get Testnet Tokens (One Time)

### Option A: Linea Testnet (for LeBron Market)

1. **Add Linea Testnet to MetaMask**
   - Network Name: `Linea Sepolia`
   - RPC URL: `https://rpc.sepolia.linea.build`
   - Chain ID: `59141`
   - Symbol: `ETH`

2. **Get Linea ETH** (for gas fees)
   - Visit: https://faucet.linea.build/
   - Connect wallet
   - Request ETH

3. **Get USDC** (for betting)
   - Add token: `0xFEce4462D57bD51A6A552365A011b95f0E16d9B7`
   - Contact Myriad team or use testnet faucet

### Option B: Abstract Testnet (for other markets)

1. **Add Abstract Testnet**
   - Network Name: `Abstract Testnet`
   - RPC URL: `https://api.testnet.abs.xyz`
   - Chain ID: `11124`
   - Symbol: `ETH`

2. **Get Abstract ETH**
   - Visit Abstract testnet faucet
   - Request ETH

3. **Get PTS Tokens**
   - Add token: `0x6cC39C1149aed1fdbf6b11Fd60C18b96446cBc96`
   - Request from faucet or Myriad team

---

## Step 2: Place Your First Bet

### 1. Go to LeBron Market
Visit: `http://localhost:3000/markets/lebron-james`

### 2. Click "Place Bet"
Button in the Binary Pool section (right side on desktop)

### 3. Connect Wallet
- Click "Connect Wallet" in the yellow warning box
- Approve connection in MetaMask
- See green checkmark ✓

### 4. Choose Your Side
- Click **YES** if you think LeBron will be traded
- Click **NO** if you think he won't
- See odds update (YES: 2.03×, NO: 1.97×)

### 5. Enter Amount
- Type amount in USDC (e.g., `10`)
- Or use quick buttons: +10, +50, +100, Max
- See potential return calculate

### 6. Place Bet
- Click "Place Bet" button
- **Network Switch**: Approve if asked
- **Token Approval**: Approve USDC spending (first time only)
- **Transaction**: Confirm the bet transaction
- Wait ~30 seconds for confirmation

### 7. Success! 🎉
- See success message with transaction hash
- Click "View" to see on block explorer
- Your bet is now on-chain!

---

## Example: Bet 10 USDC on YES

```
1. Market: LeBron James trade
2. Outcome: YES
3. Amount: 10 USDC
4. Odds: 2.03×
5. Potential Return: 20.30 USDC
6. Profit if wins: 10.30 USDC

You pay: 10 USDC
You get: ~312 shares
If YES wins: You receive 20.30 USDC
```

---

## Quick Reference

### Wallet Status Indicators

| Indicator | Meaning |
|-----------|---------|
| 🟡 Yellow box | Wallet not connected |
| 🟢 Green box | Wallet connected ✓ |
| ⏳ Spinner | Transaction processing |
| ✓ Checkmark | Transaction confirmed |

### Button States

| Button Text | What It Means |
|-------------|---------------|
| "Place Bet" | Ready to bet |
| "Confirming in wallet..." | Waiting for MetaMask |
| "Transaction Confirmed ✓" | Success! |

### Common Amounts

| Button | Amount |
|--------|--------|
| +10 | Add 10 USDC |
| +50 | Add 50 USDC |
| +100 | Add 100 USDC |
| Max | Your full balance |

---

## Costs Breakdown

### Gas Fees (in ETH)
- Network switch: FREE (just approval)
- Token approval: ~0.001 ETH (~$2 on mainnet, FREE on testnet)
- Bet transaction: ~0.002 ETH (~$4 on mainnet, FREE on testnet)

### Platform Fees
- Protocol fee: 1% of bet amount
- Example: 10 USDC bet = 0.10 USDC fee

---

## Troubleshooting

### "Wallet not connected"
→ Click "Connect Wallet" button

### "Insufficient funds"
→ Get testnet ETH and USDC from faucets

### "Wrong network"
→ App will auto-switch, approve in MetaMask

### "Transaction failed"
→ Make sure you have ETH for gas

### "Approval needed"
→ First time only, approve token spending

---

## Tips for Success

1. **Start Small**: Try 10 USDC first
2. **Check Balance**: Ensure you have ETH + USDC
3. **Wait for Confirmation**: Don't close modal too early
4. **Save Transaction Hash**: Keep for reference
5. **View on Explorer**: Verify transaction succeeded

---

## What Happens Next?

After your bet:
1. ✅ Transaction appears on block explorer
2. ✅ Shares are in your wallet
3. ✅ Position tracked by Myriad Protocol
4. ✅ If you win: Claim payout after market resolves
5. ✅ If you lose: Shares become worthless

---

## Market Resolution

### LeBron James Market
- **Question**: Will LeBron James get traded before the 2025-26 NBA Season?
- **Resolves**: October 20, 2025
- **Source**: https://www.nba.com/lakers/news
- **If YES**: LeBron gets traded → YES holders win
- **If NO**: LeBron stays with Lakers → NO holders win

---

## Need Help?

- **API Issues**: Check `.env.local` has API key
- **Wallet Issues**: Restart MetaMask
- **Network Issues**: Try different RPC URL
- **Token Issues**: Verify contract addresses

---

## Summary Checklist

Before betting:
- [ ] MetaMask installed
- [ ] Wallet connected
- [ ] On correct network (auto-switches)
- [ ] Have testnet ETH for gas
- [ ] Have USDC or PTS tokens
- [ ] Approved token spending (first time)

During betting:
- [ ] Selected outcome (YES/NO)
- [ ] Entered amount
- [ ] Reviewed potential return
- [ ] Clicked "Place Bet"
- [ ] Approved all MetaMask prompts

After betting:
- [ ] Got success message
- [ ] Saved transaction hash
- [ ] Verified on block explorer
- [ ] Bet is on-chain! 🎉

---

**Ready to bet? Visit `/markets/lebron-james` and try it now!** 🏀

