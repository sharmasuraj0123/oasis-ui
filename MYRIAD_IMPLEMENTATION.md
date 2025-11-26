# Myriad API Integration Implementation

## Overview

This document describes the complete implementation of Myriad Protocol API integration into the Next.js application. The integration fetches live market data from the Myriad API and seamlessly integrates it with existing static markets.

## Architecture

### Folder Structure

```
oasis/
├── app/
│   ├── api/
│   │   └── myriad/
│   │       ├── markets/
│   │       │   ├── route.ts              # GET /api/myriad/markets
│   │       │   └── [id]/
│   │       │       ├── route.ts          # GET /api/myriad/markets/[id]
│   │       │       └── events/
│   │       │           └── route.ts      # GET /api/myriad/markets/[id]/events
│   │       └── lebron/
│   │           └── route.ts              # GET /api/myriad/lebron
│   └── markets/
│       ├── page.tsx                      # Markets list (updated to fetch all markets)
│       └── [id]/
│           └── page.tsx                  # Individual market page (updated)
├── components/
│   └── MarketPage.tsx                    # Market detail component (updated)
├── dal/
│   └── market.ts                         # Data Access Layer (updated)
├── lib/
│   ├── types/
│   │   └── myriad.ts                     # TypeScript types for Myriad API
│   └── myriad-client.ts                  # Myriad API client functions
└── MYRIAD_SETUP.md                       # Setup instructions
```

## Implementation Details

### 1. Type Definitions (`lib/types/myriad.ts`)

Defines TypeScript interfaces for all Myriad API responses:
- `MyriadMarket` - Core market data structure
- `MyriadOutcome` - Outcome data with prices and shares
- `MyriadMarketEvent` - Trading events and transactions
- `MyriadHolder` - Market holder information
- Response types for pagination

### 2. API Client (`lib/myriad-client.ts`)

Provides functions to interact with the Myriad API:

**Key Functions:**
- `fetchMyriadMarkets()` - Fetch all markets with filtering
- `fetchMyriadMarket(id, networkId)` - Fetch specific market
- `fetchMyriadMarketBySlug(slug)` - Fetch by slug
- `fetchMyriadMarketEvents()` - Get trade history
- `fetchMyriadMarketHolders()` - Get holder information
- `fetchLeBronJamesMarket()` - Specifically fetch the LeBron market

**Features:**
- Automatic API key injection from environment variables
- Error handling with detailed messages
- Next.js cache revalidation (60 seconds)
- Type-safe responses

### 3. Next.js API Routes

#### `/api/myriad/markets` (GET)
Fetch all markets with optional filters:
- `networkId` - Filter by blockchain network (e.g., 59141 for Linea)
- `state` - Filter by state (open, closed, resolved)
- `keyword` - Search by keyword
- `limit`, `page` - Pagination
- `sort`, `order` - Sorting options

#### `/api/myriad/markets/[id]` (GET)
Fetch specific market by ID:
- Requires `networkId` query parameter
- Returns full market details including price charts

#### `/api/myriad/markets/[id]/events` (GET)
Fetch market events (trades, liquidity changes):
- Requires `networkId` query parameter
- Optional pagination with `limit` and `page`

#### `/api/myriad/lebron` (GET)
Convenience endpoint for the LeBron James market:
- No parameters required
- Auto-configured for Linea Testnet (network ID 59141)
- Market ID: 3

### 4. Data Access Layer (`dal/market.ts`)

**Key Functions:**

#### `convertMyriadToBinaryMarket(myriadMarket)`
Converts Myriad API format to internal `BinaryMarket` format:
- Calculates odds from probabilities
- Determines market status (LIVE, UPCOMING, RESOLVED)
- Maps data to match existing market structure
- Adds metrics for display

#### `getMarketById(marketId)`
Fetches a single market by ID:
- Checks if ID is a Myriad market (`lebron-james` or `myriad-3`)
- Falls back to static markets
- Returns null if not found

#### `getAllMarkets()`
Fetches all markets (static + Myriad):
- Combines static markets with LeBron market from Myriad
- Handles errors gracefully (continues without Myriad if it fails)
- Returns unified array of `BinaryMarket` objects

### 5. Updated Components

#### `app/markets/page.tsx`
**Changes:**
- Added `useEffect` to fetch all markets on mount
- Added loading state
- Uses `getAllMarkets()` instead of static `binaryMarkets`
- Markets now include LeBron James market from Myriad

#### `app/markets/[id]/page.tsx`
**Changes:**
- Server-side fetching using `getMarketById()`
- Passes `initialMarket` to `MarketPage` component
- Returns 404 if market not found

#### `components/MarketPage.tsx`
**Changes:**
- Accepts `initialMarket` prop for server-side data
- Fetches all markets for navigation in `useEffect`
- Uses dynamic markets array instead of static
- Shows loading state while fetching

## API Configuration

### Environment Variables

Create `.env.local` in the project root:

```env
# Myriad Protocol API Key
NEXT_PUBLIC_MYRIAD_API_KEY=myr_sk_liv_your_actual_key_here

# Myriad API Base URL (staging for testing)
NEXT_PUBLIC_MYRIAD_API_URL=https://api-v2.staging.myriadprotocol.com
```

**Important:** Never commit `.env.local` to version control!

### Getting Your API Key

Contact the Myriad Protocol team through their official channels to request an API key.

## LeBron James Market Details

- **Market ID:** 3
- **Network:** Linea Testnet (59141)
- **Slug:** `will-lebron-james-get-traded-before-the-2025-26-nba-season`
- **Question:** "Will LeBron James get traded before the 2025-26 NBA Season?"
- **Token Address:** 0x82Be67E8F6B783Bc0e81B24D0193182a45c83496
- **Expires:** October 20, 2025

## Accessing the Market

### URLs

1. **Market List Page:** `http://localhost:3000/markets`
   - Shows all markets including LeBron James market

2. **LeBron James Market Page:** `http://localhost:3000/markets/lebron-james`
   - Direct link to the market detail page

3. **API Endpoint:** `http://localhost:3000/api/myriad/lebron`
   - Returns raw Myriad API data

## Data Flow

### Market List Page (`/markets`)
```
User visits /markets
    ↓
Component mounts
    ↓
useEffect calls getAllMarkets()
    ↓
getAllMarkets() fetches static markets + calls fetchLeBronJamesMarket()
    ↓
fetchLeBronJamesMarket() → myriad-client → Myriad API
    ↓
API returns market data
    ↓
convertMyriadToBinaryMarket() transforms data
    ↓
Component displays all markets including LeBron
```

### Market Detail Page (`/markets/lebron-james`)
```
User visits /markets/lebron-james
    ↓
Server-side: getMarketById("lebron-james")
    ↓
Detects it's a Myriad market
    ↓
fetchLeBronJamesMarket() → myriad-client → Myriad API
    ↓
convertMyriadToBinaryMarket() transforms data
    ↓
Server passes initialMarket to MarketPage
    ↓
Component renders with live data
    ↓
Background: useEffect fetches all markets for navigation
```

## Caching Strategy

- **Next.js App Router:** Uses `next: { revalidate: 60 }` in fetch calls
- **Revalidation:** Data refreshes every 60 seconds
- **Client-side:** Markets refetch on component mount
- **Server-side:** Initial data is fetched server-side for better performance

## Error Handling

1. **API Key Missing:**
   - Throws error with clear message
   - Prevents app from making unauthorized requests

2. **Network Errors:**
   - Caught and logged to console
   - Static markets still display
   - Myriad markets silently fail

3. **Market Not Found:**
   - Returns null from `getMarketById()`
   - Triggers Next.js 404 page

4. **Invalid Response:**
   - Try/catch blocks prevent crashes
   - Logged for debugging
   - Graceful fallback to static data

## Testing

### Manual Testing Steps

1. **Set up environment:**
   ```bash
   # Create .env.local with your API key
   echo "NEXT_PUBLIC_MYRIAD_API_KEY=your_key_here" > .env.local
   echo "NEXT_PUBLIC_MYRIAD_API_URL=https://api-v2.staging.myriadprotocol.com" >> .env.local
   ```

2. **Start development server:**
   ```bash
   pnpm dev
   ```

3. **Test market list:**
   - Visit `http://localhost:3000/markets`
   - Verify LeBron James market appears in the grid
   - Check that it has live data (volume, prices)

4. **Test market detail:**
   - Click on LeBron James market
   - Verify URL is `/markets/lebron-james`
   - Check that all data displays correctly
   - Verify navigation between markets works

5. **Test API endpoints:**
   ```bash
   # Test LeBron endpoint
   curl http://localhost:3000/api/myriad/lebron
   
   # Test markets endpoint
   curl http://localhost:3000/api/myriad/markets?networkId=59141
   ```

6. **Test error handling:**
   - Remove API key from `.env.local`
   - Restart server
   - Verify static markets still work
   - Check console for error messages

## Performance Considerations

1. **Server-Side Rendering:**
   - Initial market data fetched server-side
   - Reduces client-side loading time
   - Better SEO

2. **Caching:**
   - 60-second revalidation prevents excessive API calls
   - Reduces load on Myriad API
   - Improves response times

3. **Graceful Degradation:**
   - App works without Myriad API
   - Static markets always available
   - No breaking errors

4. **Parallel Loading:**
   - Markets fetch in parallel on list page
   - Navigation data loads in background

## Future Enhancements

1. **Real-time Updates:**
   - Add WebSocket support for live price updates
   - Implement polling for active markets

2. **More Myriad Markets:**
   - Extend `getAllMarkets()` to fetch all Myriad markets
   - Add filter for Myriad vs static markets

3. **Trading Integration:**
   - Implement `fetchMyriadQuote()` for trade estimates
   - Connect wallet for actual trading

4. **Advanced Caching:**
   - Use React Query or SWR for better cache management
   - Implement optimistic updates

5. **Market Creation:**
   - Allow users to create new markets via Myriad API
   - Form for market submission

## Troubleshooting

### Issue: "Myriad API key not configured"
**Solution:** Create `.env.local` with `NEXT_PUBLIC_MYRIAD_API_KEY`

### Issue: Market not appearing in list
**Solution:** 
- Check API key is valid
- Check network connectivity
- Verify Myriad API is accessible
- Check browser console for errors

### Issue: 404 on `/markets/lebron-james`
**Solution:**
- Verify market ID in DAL is correct
- Check `getMarketById()` logic
- Ensure API returns data

### Issue: Stale data showing
**Solution:**
- Clear browser cache
- Restart development server
- Check revalidation settings

## Contact

For issues with:
- **Myriad API:** Contact Myriad Protocol team
- **Integration code:** Check this documentation
- **Next.js setup:** See Next.js documentation

## References

- [Myriad Protocol Documentation](https://help.myriad.markets/developer-docs-v2)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Linea Testnet](https://docs.linea.build/)

