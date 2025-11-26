# Oscar Piastri F1 Market - Quick Reference Card

## 🏎️ At a Glance

**Market Question:** Will Oscar Piastri win the F1 Drivers Championship 2025?

| Property | Value |
|----------|-------|
| **Myriad Market ID** | 1 |
| **Internal ID** | `oscar-piastri` (or `myriad-1`) |
| **Network** | Linea Testnet (59141) |
| **Market Tag** | 🏎️ Formula 1 |
| **Tag Color** | Red (#EF4444) |
| **Status** | LIVE (check market page) |

---

## 🔗 Quick Links

| What | URL |
|------|-----|
| **Market List** | http://localhost:3000/markets |
| **Direct Market** | http://localhost:3000/markets/oscar-piastri |
| **API Endpoint** | http://localhost:3000/api/myriad/piastri |
| **Block Explorer** | https://sepolia.lineascan.build |
| **Network Faucet** | https://faucet.linea.build |

---

## 💰 Betting Requirements

### Tokens Needed
- **Testnet ETH:** ~0.01 (for gas)
- **Testnet USDC:** Amount you want to bet

### USDC Details
- **Contract:** `0xFEce4462D57bD51A6A552365A011b95f0E16d9B7`
- **Symbol:** USDC
- **Decimals:** 6

### Network Details
- **Name:** Linea Sepolia
- **Chain ID:** 59141
- **RPC:** https://rpc.sepolia.linea.build
- **Explorer:** https://sepolia.lineascan.build

---

## 🎯 Quick Betting Steps

1. **Visit:** http://localhost:3000/markets/oscar-piastri
2. **Click:** "Place Bet" button
3. **Select:** YES or NO
4. **Enter:** Amount (e.g., "10")
5. **Connect:** Wallet (if not connected)
6. **Switch:** To Linea Testnet (if prompted)
7. **Approve:** USDC spending (first time only)
8. **Confirm:** Transaction in wallet
9. **Done:** See transaction hash ✅

---

## 📂 Modified Files

### Created
- `app/api/myriad/piastri/route.ts`
- `OSCAR_PIASTRI_*.md` (documentation)

### Updated
- `lib/myriad-client.ts` → Added `fetchOscarPiastriMarket()`
- `dal/market.ts` → Added market handling + auto-detection
- `components/BettingModal.tsx` → Added `oscar-piastri` support

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| Market not found | Check API key configured |
| Can't bet | Ensure market status is LIVE |
| Wrong network | Switch to Linea Testnet (59141) |
| No USDC | Get from faucet or bridge |
| Approval fails | Check ETH balance for gas |
| Transaction reverts | Reduce bet amount |

---

## 📖 Documentation

- **Full Guide:** `OSCAR_PIASTRI_MARKET.md`
- **Testing:** `OSCAR_PIASTRI_BETTING_TEST.md`
- **Summary:** `OSCAR_PIASTRI_COMPLETE_SUMMARY.md`
- **This Card:** `OSCAR_PIASTRI_QUICK_REF.md`

---

## 🔍 Code Snippets

### Fetch Market (TypeScript)
```typescript
import { fetchOscarPiastriMarket } from "@/lib/myriad-client";

const market = await fetchOscarPiastriMarket();
console.log(market.title); // "Will Oscar Piastri win..."
```

### Get Market by ID
```typescript
import { getMarketById } from "@/dal/market";

const market = await getMarketById("oscar-piastri");
// or
const market = await getMarketById("myriad-1");
```

### Check if Myriad Market (in BettingModal)
```typescript
const isMyriadMarket = 
  currentMarket.id.startsWith("myriad-") || 
  currentMarket.id === "lebron-james" || 
  currentMarket.id === "oscar-piastri";
```

---

## ✅ Success Indicators

**Market Working:**
- ✅ Appears in markets list
- ✅ Shows 🏎️ Formula 1 tag
- ✅ Displays real-time odds
- ✅ "Place Bet" button visible

**Betting Working:**
- ✅ Modal opens
- ✅ Wallet connects
- ✅ Network switches
- ✅ USDC approves
- ✅ Transaction confirms
- ✅ Success toast shows

---

## 🚀 Start Testing

```bash
# Start dev server
npm run dev

# Visit market
# http://localhost:3000/markets/oscar-piastri

# Place a bet!
```

**That's it! Happy betting! 🏎️💨**

