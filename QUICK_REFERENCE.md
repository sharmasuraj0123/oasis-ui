# Myriad Integration Quick Reference

## ⚡ Quick Start

1. **Create `.env.local` file:**
   ```env
   NEXT_PUBLIC_MYRIAD_API_KEY=myr_sk_liv_your_key_here
   NEXT_PUBLIC_MYRIAD_API_URL=https://api-v2.staging.myriadprotocol.com
   ```

2. **Start dev server:**
   ```bash
   pnpm dev
   ```

3. **Access LeBron market:**
   - List: `http://localhost:3000/markets`
   - Detail: `http://localhost:3000/markets/lebron-james`
   - API: `http://localhost:3000/api/myriad/lebron`

## 📁 Key Files Created

| File | Purpose |
|------|---------|
| `lib/types/myriad.ts` | TypeScript types for Myriad API |
| `lib/myriad-client.ts` | API client functions |
| `dal/market.ts` | Data access layer with conversion logic |
| `app/api/myriad/markets/route.ts` | GET all markets endpoint |
| `app/api/myriad/markets/[id]/route.ts` | GET single market endpoint |
| `app/api/myriad/markets/[id]/events/route.ts` | GET market events endpoint |
| `app/api/myriad/lebron/route.ts` | GET LeBron market endpoint |

## 🔧 Key Functions

### Client Functions (`lib/myriad-client.ts`)

```typescript
// Fetch all markets
await fetchMyriadMarkets({ networkId: 59141, state: 'open' })

// Fetch specific market
await fetchMyriadMarket(3, 59141)

// Fetch LeBron market
await fetchLeBronJamesMarket()

// Fetch market events
await fetchMyriadMarketEvents(3, 59141, { limit: 50 })
```

### DAL Functions (`dal/market.ts`)

```typescript
// Get market by ID (works for both static and Myriad)
const market = await getMarketById('lebron-james')

// Get all markets (static + Myriad)
const markets = await getAllMarkets()

// Convert Myriad format to internal format
const binaryMarket = convertMyriadToBinaryMarket(myriadMarket)
```

## 🎯 Market IDs

| Market | ID | Network |
|--------|----|---------| 
| LeBron James | `lebron-james` or `myriad-3` | Linea Testnet (59141) |

## 🌐 API Endpoints

### Local Development

```bash
# Get all Myriad markets
GET /api/myriad/markets?networkId=59141&state=open

# Get specific market
GET /api/myriad/markets/3?networkId=59141

# Get market events
GET /api/myriad/markets/3/events?networkId=59141&limit=50

# Get LeBron market
GET /api/myriad/lebron
```

### Myriad API (Direct)

```bash
# Base URL
https://api-v2.staging.myriadprotocol.com

# Get markets
GET /markets?network_id=59141

# Get specific market
GET /markets/3?network_id=59141

# Headers
x-api-key: myr_sk_liv_your_key_here
Content-Type: application/json
```

## 🔍 Testing Checklist

- [ ] API key configured in `.env.local`
- [ ] Dev server running
- [ ] LeBron market appears on `/markets`
- [ ] Market detail page loads at `/markets/lebron-james`
- [ ] Live data showing (volume, prices, etc.)
- [ ] Navigation between markets works
- [ ] API endpoint `/api/myriad/lebron` returns data

## 🐛 Common Issues

| Issue | Solution |
|-------|----------|
| "API key not configured" | Add `NEXT_PUBLIC_MYRIAD_API_KEY` to `.env.local` |
| Market not showing | Check API key is valid, restart server |
| 404 on market page | Verify market ID matches in DAL |
| Stale data | Clear cache, restart server |

## 📊 Data Structure

### Myriad Market → Binary Market Conversion

```typescript
{
  // Myriad API
  id: 3,
  title: "Will LeBron James...",
  outcomes: [
    { id: 0, title: "Yes", price: 0.491867 },
    { id: 1, title: "No", price: 0.508133 }
  ],
  volume: 62.996,
  state: "open"
}

// ↓ Converted to ↓

{
  // Internal format
  id: "lebron-james",
  question: "Will LeBron James...",
  yesOdds: 2.03,  // 1 / 0.491867
  noOdds: 1.97,   // 1 / 0.508133
  totalVolume: 62.996,
  status: "LIVE",
  currentYesProb: 49.19  // 0.491867 * 100
}
```

## 🔄 Data Flow

```
User Request → Server Component → DAL → Myriad Client → Myriad API
                                  ↓
                        Convert to BinaryMarket
                                  ↓
                        Return to Component
                                  ↓
                            Render UI
```

## 📖 Documentation

- **Setup:** `MYRIAD_SETUP.md`
- **Implementation:** `MYRIAD_IMPLEMENTATION.md`
- **This file:** Quick reference only

## 🚀 Next Steps

1. **Get API Key:** Contact Myriad Protocol team
2. **Configure:** Add to `.env.local`
3. **Test:** Follow testing checklist above
4. **Deploy:** Remember to add environment variables to production

## 💡 Tips

- API data revalidates every 60 seconds
- Markets work offline with static data
- Server-side rendering for better performance
- Graceful error handling - no breaking errors

