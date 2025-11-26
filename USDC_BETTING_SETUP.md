# USDC Betting Setup - Quick Guide

## 🎯 You Want to Bet in USDC Only

Perfect! Here's exactly what you need:

---

## Current Status

✅ You have MetaMask  
✅ You're connected: `0x8648...d6B2`  
✅ You're on Linea Sepolia (59141)  
❌ **You need USDC tokens** ← This is the issue!

---

## The Problem

The error `missing revert data` means:
```
Your wallet has 0 USDC tokens
↓
Can't approve spending
↓
Transaction fails
```

---

## The Solution: Get USDC

### Step 1: Add USDC Token to MetaMask

1. Open MetaMask
2. Click "Assets" tab
3. Scroll down, click "Import tokens"
4. Enter these details:
   ```
   Token Address: 0xFEce4462D57bD51A6A552365A011b95f0E16d9B7
   Symbol: USDC
   Decimals: 18
   ```
5. Click "Add custom token"
6. Click "Import tokens"

**Result**: USDC will now show in your assets (balance: 0)

---

### Step 2: Get Testnet USDC

**Option A: Contact Myriad Protocol Team (Fastest)**

Send them this message:
```
Hi Myriad team,

I need testnet USDC for Linea Sepolia to test betting.

Wallet: 0x8648d3351a06B03e039Cd0818379F1717BCDd6B2
Network: Linea Sepolia (59141)
Token: USDC (0xFEce4462D57bD51A6A552365A011b95f0E16d9B7)
Amount: 100-500 USDC

Thanks!
```

**Where to contact**:
- Check Myriad Protocol website for support email
- Join their Discord
- Ask in their community channels

---

**Option B: Bridge from Ethereum Sepolia**

1. Get Sepolia ETH: https://sepoliafaucet.com/
2. Get Sepolia USDC from Aave faucet:
   - Visit: https://staging.aave.com/faucet/
   - Connect wallet on Sepolia
   - Request USDC
3. Bridge to Linea:
   - Visit: https://bridge.linea.build/
   - Bridge USDC from Sepolia to Linea Sepolia
   - Wait 10-20 minutes

---

**Option C: Check if There's a Linea USDC Faucet**

- Visit Linea Discord: https://discord.gg/linea
- Ask: "Is there a USDC faucet for Linea Sepolia?"
- Community might have solutions

---

### Step 3: Verify You Have USDC

1. Open MetaMask
2. Make sure you're on Linea Sepolia
3. Check assets:
   ```
   ✅ ETH: 0.5+ (for gas)
   ✅ USDC: 100+ (for betting)
   ```

---

### Step 4: Try Betting Again

1. Go to `/markets/lebron-james`
2. Click "Place Bet"
3. Select YES or NO
4. Enter amount (e.g., 10 USDC)
5. Click "Place Bet"
6. Should work now! ✅

---

## Visual Check

### Before (Current State)
```
MetaMask Assets:
├─ ETH: 0.5 ✅
└─ USDC: 0 ❌ ← Need tokens here!
```

### After (Ready to Bet)
```
MetaMask Assets:
├─ ETH: 0.5 ✅
└─ USDC: 100 ✅ ← Ready!
```

---

## Why This Happens

On testnet, tokens don't have real value, so:
1. Faucets give away tokens for free
2. But you have to request them
3. They're not automatically in your wallet

Think of it like:
- **Mainnet**: Buy USDC with real money
- **Testnet**: Request USDC from faucet (free)

---

## Timeline

| Step | Time | Action |
|------|------|--------|
| 1 | 2 min | Add USDC token to MetaMask |
| 2 | 5-30 min | Contact Myriad/use faucet |
| 3 | 1-10 min | Wait for tokens to arrive |
| 4 | 1 min | Verify balance in MetaMask |
| 5 | 2 min | Place your first bet! |

**Total**: 11-43 minutes depending on method

---

## Common Questions

### Q: Why can't I just buy testnet USDC?
**A**: Testnet tokens have no value - they're only for testing. Must get from faucets.

### Q: How much USDC do I need?
**A**: 100 USDC is enough for 10 bets of 10 USDC each. Request 500+ for extensive testing.

### Q: Will this work on mainnet later?
**A**: Yes! On mainnet, you'd use real USDC (bought on exchange). Same betting flow.

### Q: Can I use a different token?
**A**: For LeBron market on Linea, only USDC works. Other markets on Abstract use PTS.

### Q: Is there a faster way?
**A**: Contacting Myriad team directly is usually fastest - they can send tokens immediately.

---

## Backup Option: Test on Abstract

If you can't get Linea USDC quickly:

1. **Switch to Abstract Testnet** markets
2. **Use PTS tokens** instead
3. **Test betting mechanics** there
4. **Come back to Linea** when you have USDC

Both work the same way - just different networks/tokens!

---

## Need Help?

### Myriad Protocol
- They maintain the markets
- Can send testnet tokens
- Check their website for contact

### Linea Community
- Discord: https://discord.gg/linea
- Might have USDC faucet info
- Community is helpful

### This Project
- Check [GET_USDC_TESTNET.md](GET_USDC_TESTNET.md)
- Read [ERROR_HANDLING_GUIDE.md](ERROR_HANDLING_GUIDE.md)
- See [BETTING_QUICK_START.md](BETTING_QUICK_START.md)

---

## ✅ Summary

**Your Issue**: No USDC tokens in wallet  
**Solution**: Get testnet USDC from faucet or Myriad team  
**Your Wallet**: `0x8648d3351a06B03e039Cd0818379F1717BCDd6B2`  
**Network**: Linea Sepolia (59141)  
**Token Needed**: USDC (`0xFEce...d6B7`)  
**Amount**: 100+ USDC  
**Time**: 10-40 minutes  

Once you have USDC → Betting will work perfectly! 🎉

---

**Next Step**: Contact Myriad team or use Aave faucet to get testnet USDC! 🚀

