# Getting Testnet Tokens Guide

## 🪙 Required Tokens for Betting

To place bets on Oasis, you need **two types of tokens**:

1. **Native Token (ETH/BNB)** - For gas fees
2. **Betting Token (USDC/PTS)** - For placing bets

The specific tokens depend on which network the market is on.

---

## 🌐 Linea Testnet (For LeBron James Market)

### Step 1: Get Linea ETH (Gas)

1. **Visit Linea Faucet**: https://faucet.linea.build/
2. **Connect MetaMask** on Linea Sepolia network
3. **Request ETH** - You'll receive ~0.5 ETH
4. **Wait** - Usually arrives in 1-2 minutes

### Step 2: Get USDC Testnet Tokens

**Option A: Use Linea Bridge (Recommended)**
1. Visit: https://bridge.linea.build/
2. Bridge some testnet ETH from Sepolia to Linea
3. Swap for USDC on a Linea testnet DEX

**Option B: Import Token and Request from Community**
1. Add USDC token to MetaMask:
   - Contract: `0xFEce4462D57bD51A6A552365A011b95f0E16d9B7`
   - Symbol: `USDC`
   - Decimals: `18`
2. Ask in Linea Discord for testnet USDC
3. Or contact Myriad Protocol team

**Option C: Use Testnet Faucet (if available)**
- Check https://faucet.linea.build/ for USDC option
- Some faucets provide multiple tokens

### Verify You Have Tokens

In MetaMask, you should see:
- ✅ ETH: ~0.5 (for gas fees)
- ✅ USDC: 100+ (for betting)

---

## 🎨 Abstract Testnet (For Other Markets)

### Step 1: Get Abstract ETH (Gas)

1. **Add Abstract Testnet** to MetaMask:
   - Network: Abstract Testnet
   - RPC: `https://api.testnet.abs.xyz`
   - Chain ID: `11124`
   - Symbol: `ETH`
   - Explorer: `https://explorer.testnet.abs.xyz`

2. **Visit Abstract Faucet**: 
   - Check Abstract Discord or docs for faucet link
   - Request testnet ETH

3. **Alternative**: Bridge from Ethereum Sepolia if available

### Step 2: Get PTS Tokens (Myriad PTS SZN 2)

1. **Add PTS Token** to MetaMask:
   - Contract: `0x6cC39C1149aed1fdbf6b11Fd60C18b96446cBc96`
   - Symbol: `PTS`
   - Decimals: `18`

2. **Request Tokens**:
   - Contact Myriad Protocol team
   - Ask in Abstract Discord
   - Check for PTS faucet

### Verify You Have Tokens

In MetaMask, you should see:
- ✅ ETH: ~0.1+ (for gas fees)
- ✅ PTS: 100+ (for betting)

---

## 🟡 BNB Chain Testnet (For Future Markets)

### Step 1: Get BNB Testnet (Gas)

1. **Visit BNB Faucet**: https://testnet.bnbchain.org/faucet-smart
2. **Connect MetaMask** on BNB testnet
3. **Request BNB** - You'll receive ~0.5 BNB
4. **Complete captcha** if required

### Step 2: Get Betting Tokens

- Tokens will be announced when markets are available
- Follow same pattern as above (add token, request from faucet)

---

## 📋 Quick Checklist

Before betting on **Linea** (LeBron market):
- [ ] Linea Testnet added to MetaMask
- [ ] Have Linea ETH (~0.5 ETH for gas)
- [ ] Have USDC tokens (100+ for betting)
- [ ] Both tokens visible in MetaMask

Before betting on **Abstract**:
- [ ] Abstract Testnet added to MetaMask
- [ ] Have Abstract ETH (~0.1+ ETH for gas)
- [ ] Have PTS tokens (100+ for betting)
- [ ] Both tokens visible in MetaMask

---

## 💡 Pro Tips

1. **Get Extra ETH**: Always have more than you need for gas
2. **Test Small First**: Try a 10 USDC bet before larger amounts
3. **Save Addresses**: Bookmark token contracts for easy reference
4. **Join Communities**: Discord servers often have help channels
5. **Ask Myriad Team**: They can provide testnet tokens directly

---

## 🐛 Troubleshooting

### "Token contract not found"
**Problem**: Token doesn't exist on current network
**Solution**: 
- Make sure you're on correct network (Linea for LeBron)
- Verify contract address is correct
- Try adding token manually to MetaMask

### "Insufficient token balance"
**Problem**: You don't have enough USDC/PTS
**Solution**:
- Get tokens from faucet
- Contact Myriad team for testnet tokens
- Check token balance in MetaMask

### "Insufficient funds for gas"
**Problem**: Not enough ETH for transaction
**Solution**:
- Get more ETH from faucet
- Wait for previous transaction to complete
- Reduce gas limit if possible

### "Failed to verify token contract"
**Problem**: Can't connect to token contract
**Solution**:
- Check network connection
- Try different RPC URL
- Refresh MetaMask and try again

---

## 📞 Getting Help

### Linea Support
- **Discord**: https://discord.gg/linea
- **Docs**: https://docs.linea.build/
- **Faucet**: https://faucet.linea.build/

### Abstract Support
- **Discord**: Check Abstract website
- **Docs**: https://abs.xyz/docs
- **Twitter**: @AbstractChain

### Myriad Protocol
- **Contact**: Myriad Protocol team
- **API**: help@myriad.markets
- **Discord**: Myriad community

---

## 🎯 Token Addresses Reference

### Linea Testnet (59141)
```
ETH: Native token (no contract)
USDC: 0xFEce4462D57bD51A6A552365A011b95f0E16d9B7
Prediction Market: 0xED5CCb260f80A7EB1E5779B02115b4dc25aA3cDE
```

### Abstract Testnet (11124)
```
ETH: Native token (no contract)
USDC.e: 0x8820c84FD53663C2e2EA26e7a4c2b79dCc479765
PENGU: 0x6ccDDCf494182a3A237ac3f33A303a57961FaF55
PTS: 0x6cC39C1149aed1fdbf6b11Fd60C18b96446cBc96
Prediction Market: 0x6c44Abf72085E5e71EeB7C951E3079073B1E7312
```

### BNB Chain Testnet (97)
```
BNB: Native token (no contract)
Other tokens: TBA
```

---

## 📊 How Much Do I Need?

### For Testing (First Time)
- **Gas ETH**: 0.1 ETH (plenty for 10+ transactions)
- **Betting Tokens**: 50-100 USDC/PTS (enough for several bets)

### For Regular Use
- **Gas ETH**: 0.5+ ETH (comfortable buffer)
- **Betting Tokens**: 500+ USDC/PTS (multiple bets)

### For Heavy Testing
- **Gas ETH**: 1+ ETH (won't run out)
- **Betting Tokens**: 1000+ USDC/PTS (extensive testing)

---

## ✅ Verification Steps

After getting tokens:

1. **Open MetaMask**
2. **Switch to correct network** (Linea/Abstract)
3. **Check balances**:
   - Native token (ETH/BNB) > 0.1
   - Betting token (USDC/PTS) > 10
4. **Try a test transaction** (small bet)
5. **Confirm it works** before larger bets

---

## 🎉 Ready to Bet?

Once you have:
- ✅ MetaMask installed
- ✅ Correct network added
- ✅ Gas tokens (ETH/BNB)
- ✅ Betting tokens (USDC/PTS)

You're ready to place bets on Oasis! 

Visit `/markets/lebron-james` and try your first bet! 🏀

---

**Remember**: These are testnet tokens with **NO real value**. Use them freely for testing!

