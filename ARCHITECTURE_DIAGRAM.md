# Myriad Integration Architecture

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER BROWSER                            │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         │ HTTP Request
                         │
┌────────────────────────▼────────────────────────────────────────┐
│                    NEXT.JS APP ROUTER                           │
│                                                                  │
│  ┌─────────────────┐         ┌──────────────────┐              │
│  │  /markets       │         │ /markets/[id]    │              │
│  │  (page.tsx)     │         │ (page.tsx)       │              │
│  │                 │         │                  │              │
│  │  • Client       │         │  • Server Side   │              │
│  │    Component    │         │    Rendering     │              │
│  │  • useEffect    │         │  • getMarketById │              │
│  │    fetches      │         │                  │              │
│  │    markets      │         │                  │              │
│  └────────┬────────┘         └────────┬─────────┘              │
│           │                           │                         │
│           │                           │                         │
│  ┌────────▼───────────────────────────▼─────────┐              │
│  │         REACT COMPONENTS                     │              │
│  │                                              │              │
│  │  • MarketPage.tsx                           │              │
│  │  • BettingModal.tsx                         │              │
│  │  • MarketDataTabs.tsx                       │              │
│  │  • MetricsBreakdown.tsx                     │              │
│  └──────────────────┬───────────────────────────┘              │
│                     │                                           │
└─────────────────────┼───────────────────────────────────────────┘
                      │
                      │ Calls DAL functions
                      │
┌─────────────────────▼───────────────────────────────────────────┐
│                 DATA ACCESS LAYER (DAL)                         │
│                    (dal/market.ts)                              │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  getAllMarkets()                                         │  │
│  │    • Fetches static markets                             │  │
│  │    • Calls fetchLeBronJamesMarket()                     │  │
│  │    • Combines results                                    │  │
│  └─────────────────────────┬────────────────────────────────┘  │
│                            │                                    │
│  ┌─────────────────────────▼───────────────────────────────┐  │
│  │  getMarketById(id)                                      │  │
│  │    • Checks if Myriad market                           │  │
│  │    • Falls back to static                              │  │
│  └─────────────────────────┬───────────────────────────────┘  │
│                            │                                    │
│  ┌─────────────────────────▼───────────────────────────────┐  │
│  │  convertMyriadToBinaryMarket()                         │  │
│  │    • Transforms Myriad format                          │  │
│  │    • Calculates odds                                   │  │
│  │    • Maps to BinaryMarket                             │  │
│  └─────────────────────────┬───────────────────────────────┘  │
│                            │                                    │
└────────────────────────────┼────────────────────────────────────┘
                             │
                             │ Uses client functions
                             │
┌────────────────────────────▼────────────────────────────────────┐
│                    MYRIAD API CLIENT                            │
│                  (lib/myriad-client.ts)                         │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  fetchLeBronJamesMarket()                               │  │
│  │    • Calls fetchMyriadMarket(3, 59141)                 │  │
│  └─────────────────────────┬────────────────────────────────┘  │
│                            │                                    │
│  ┌─────────────────────────▼───────────────────────────────┐  │
│  │  fetchMyriadMarket(id, networkId)                      │  │
│  │    • Builds API URL                                    │  │
│  │    • Adds auth headers                                 │  │
│  │    • Handles errors                                    │  │
│  └─────────────────────────┬───────────────────────────────┘  │
│                            │                                    │
│  ┌─────────────────────────▼───────────────────────────────┐  │
│  │  myriadFetch(endpoint, options)                        │  │
│  │    • Base fetch function                               │  │
│  │    • Injects API key from env                          │  │
│  │    • Sets cache revalidation                           │  │
│  └─────────────────────────┬───────────────────────────────┘  │
│                            │                                    │
└────────────────────────────┼────────────────────────────────────┘
                             │
                             │ HTTP Request
                             │ x-api-key: myr_sk_liv_xxx
                             │
┌────────────────────────────▼────────────────────────────────────┐
│                    MYRIAD PROTOCOL API                          │
│          https://api-v2.staging.myriadprotocol.com             │
│                                                                  │
│  • GET /markets                                                │
│  • GET /markets/:id                                            │
│  • GET /markets/:id/events                                     │
│                                                                  │
│  Returns: Market data from Linea Testnet                       │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow - Market List Page

```
┌─────────────────────────────────────────────────────────────┐
│ 1. User visits /markets                                     │
└─────────────────────────┬───────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────┐
│ 2. Component mounts → useEffect triggered                   │
└─────────────────────────┬───────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────┐
│ 3. Call getAllMarkets()                                     │
│    ├─ Load static markets from data.ts                      │
│    └─ Call fetchLeBronJamesMarket()                         │
└─────────────────────────┬───────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────┐
│ 4. Myriad Client fetches from API                           │
│    GET /markets/3?network_id=59141                          │
└─────────────────────────┬───────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────┐
│ 5. Myriad API returns market data                           │
│    {                                                        │
│      id: 3,                                                 │
│      title: "Will LeBron James...",                         │
│      outcomes: [...],                                       │
│      volume: 62.996                                         │
│    }                                                        │
└─────────────────────────┬───────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────┐
│ 6. Convert to BinaryMarket format                           │
│    convertMyriadToBinaryMarket(myriadData)                  │
│    • Calculate odds from prices                             │
│    • Determine status (LIVE/UPCOMING/RESOLVED)              │
│    • Map fields to BinaryMarket interface                   │
└─────────────────────────┬───────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────┐
│ 7. Combine with static markets                              │
│    [...staticMarkets, lebronMarket]                         │
└─────────────────────────┬───────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────┐
│ 8. Update component state                                   │
│    setMarkets(allMarkets)                                   │
│    setIsLoading(false)                                      │
└─────────────────────────┬───────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────┐
│ 9. Render market grid                                       │
│    {markets.map(market => <MarketCard />)}                  │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow - Market Detail Page

```
┌─────────────────────────────────────────────────────────────┐
│ 1. User visits /markets/lebron-james                        │
└─────────────────────────┬───────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────┐
│ 2. Server Component executes                                │
│    const market = await getMarketById("lebron-james")       │
└─────────────────────────┬───────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────┐
│ 3. DAL checks if Myriad market                              │
│    if (id === "lebron-james" || id === "myriad-3")          │
└─────────────────────────┬───────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────┐
│ 4. Fetch from Myriad API                                    │
│    const myriadMarket = await fetchLeBronJamesMarket()      │
└─────────────────────────┬───────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────┐
│ 5. Convert to BinaryMarket                                  │
│    const market = convertMyriadToBinaryMarket(myriadMarket) │
└─────────────────────────┬───────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────┐
│ 6. Pass to Client Component                                 │
│    <MarketPage                                              │
│      selectedMarketId="lebron-james"                        │
│      initialMarket={market}                                 │
│    />                                                       │
└─────────────────────────┬───────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────┐
│ 7. Client Component hydrates                                │
│    • Uses initialMarket for immediate render                │
│    • useEffect fetches all markets for navigation           │
└─────────────────────────┬───────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────┐
│ 8. Render market details                                    │
│    • Performance graph                                      │
│    • Metrics breakdown                                      │
│    • Betting widget                                         │
└─────────────────────────────────────────────────────────────┘
```

## File Dependencies

```
app/markets/page.tsx
  ├─ imports: getAllMarkets from dal/market.ts
  ├─ imports: BinaryMarket type from lib/data.ts
  └─ renders: MarketCard components

app/markets/[id]/page.tsx
  ├─ imports: getMarketById from dal/market.ts
  ├─ imports: MarketPage from components/MarketPage.tsx
  └─ passes: initialMarket prop

components/MarketPage.tsx
  ├─ imports: getAllMarkets from dal/market.ts
  ├─ imports: BinaryMarket type from lib/data.ts
  └─ renders: Market detail UI

dal/market.ts
  ├─ imports: fetchLeBronJamesMarket from lib/myriad-client.ts
  ├─ imports: MyriadMarket type from lib/types/myriad.ts
  ├─ imports: binaryMarkets from lib/data.ts
  └─ exports: getMarketById, getAllMarkets, convertMyriadToBinaryMarket

lib/myriad-client.ts
  ├─ imports: Types from lib/types/myriad.ts
  ├─ uses: process.env.NEXT_PUBLIC_MYRIAD_API_KEY
  └─ exports: All fetch functions

lib/types/myriad.ts
  └─ exports: TypeScript interfaces
```

## Environment Configuration

```
.env.local (NOT in git)
  ↓
process.env.NEXT_PUBLIC_MYRIAD_API_KEY
  ↓
Used by lib/myriad-client.ts
  ↓
Sent as x-api-key header
  ↓
Myriad Protocol API
```

## Caching Strategy

```
┌─────────────────────────────────────────────────────────────┐
│ Request to Myriad API                                       │
└─────────────────────────┬───────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────┐
│ Next.js Cache (60 seconds)                                  │
│   • next: { revalidate: 60 }                                │
│   • Shared across requests                                  │
│   • Automatic background revalidation                       │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          ├─ Cache HIT: Return cached data
                          │
                          └─ Cache MISS: Fetch from API
                                         Update cache
```

## Error Handling Flow

```
┌─────────────────────────────────────────────────────────────┐
│ API Request                                                 │
└─────────────────────────┬───────────────────────────────────┘
                          │
                    Try/Catch Block
                          │
            ┌─────────────┴─────────────┐
            │                           │
      ┌─────▼─────┐              ┌──────▼──────┐
      │  Success  │              │   Error     │
      └─────┬─────┘              └──────┬──────┘
            │                           │
            │                           │
      ┌─────▼─────────────┐    ┌────────▼─────────────┐
      │ Return data       │    │ Log error            │
      │ Render market     │    │ Return null/fallback │
      └───────────────────┘    │ Static markets work  │
                               └──────────────────────┘
```

## Type Safety Flow

```
Myriad API Response (JSON)
  ↓
Parsed by myriadFetch<T>
  ↓
Validated against MyriadMarket interface
  ↓
TypeScript compilation check
  ↓
Passed to convertMyriadToBinaryMarket()
  ↓
Transformed to BinaryMarket interface
  ↓
Used in React components
  ↓
Full IntelliSense support
```

## Deployment Checklist

```
┌─────────────────────────────────────────────────────────────┐
│ Development                                                 │
│   ✓ .env.local created                                      │
│   ✓ API key added                                           │
│   ✓ pnpm dev running                                        │
│   ✓ Markets loading                                         │
└─────────────────────────┬───────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────┐
│ Staging                                                     │
│   ✓ Environment variables configured                        │
│   ✓ Build successful                                        │
│   ✓ API endpoints tested                                    │
│   ✓ UI verified                                             │
└─────────────────────────┬───────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────┐
│ Production                                                  │
│   ✓ Production API key obtained                             │
│   ✓ Environment variables set                               │
│   ✓ Rate limiting configured                                │
│   ✓ Error tracking enabled                                  │
│   ✓ Performance monitoring                                  │
└─────────────────────────────────────────────────────────────┘
```

