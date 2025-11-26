# Dynamic Betting Data Update

## Summary

Updated the betting components to use dynamic market data from the Myriad API instead of static values. Now the Binary Pool section and Place Bet modal display live data for markets including the LeBron James market.

## Changes Made

### 1. BettingWidget Component (`components/BettingWidget.tsx`)

**Updated to accept and display dynamic market data:**

- Added `market?: BinaryMarket` prop to receive current market data
- **TOTAL POOL**: Now calculates from `market.yesPoolSize + market.noPoolSize`
- **Pool Size Formatting**: Displays as "$X.XK" for values >= 1000, otherwise "$X"
- **Current Odds Section**: Replaced "Most Popular" with live YES/NO odds from market data
  - Shows `market.yesOdds` for YES
  - Shows `market.noOdds` for NO
- Graceful fallback: Shows "$0" if no market data available

**Example Output for LeBron Market:**
```
TOTAL POOL: $2.0K  (calculated from yesPoolSize + noPoolSize)
YOUR BETS: 0

Current Odds:
YES: 2.03×
NO: 1.97×
```

### 2. BettingModal Component (`components/BettingModal.tsx`)

**Updated to fetch and use dynamic market data:**

- Removed dependency on static `binaryMarkets` import
- Added `markets` state to store dynamically fetched markets
- Added `useEffect` to fetch all markets when modal opens using `getAllMarkets()`
- **Question Display**: Uses actual market question from API
- **Odds Calculation**: Uses real `market.yesOdds` and `market.noOdds`
- **Pool Sizes**: Displays actual pool sizes from market data
- **Potential Return**: Calculates based on real odds from API

**Dynamic Data in Modal:**
- Market question (e.g., "Will LeBron James get traded...")
- YES odds (e.g., 2.03×)
- NO odds (e.g., 1.97×)
- YES pool size (from `market.yesPoolSize`)
- NO pool size (from `market.noPoolSize`)
- Accurate potential return calculations

### 3. MarketPage Component (`components/MarketPage.tsx`)

**Updated to pass market data to BettingWidget:**

- Modified `BettingWidget` instantiation to include `market={currentMarket}` prop
- Ensures current market data flows to the betting widget
- Market data is already available from server-side fetch or client-side state

## Data Flow

```
Server/API
    ↓
getMarketById("lebron-james")
    ↓
MarketPage Component (has currentMarket)
    ↓
BettingWidget (receives market prop)
    ↓
Displays: Total Pool, YES/NO Odds

When "Place Bet" clicked:
    ↓
BettingModal opens
    ↓
Fetches getAllMarkets()
    ↓
Finds current market
    ↓
Displays: Question, Odds, Pool Sizes
    ↓
Calculates: Potential Return based on real odds
```

## Before vs After

### Before (Static Data)
```typescript
// BettingWidget
TOTAL POOL: $23,430  // Hardcoded
Most Popular: GTrader 1.72× // Static

// BettingModal
Odds: 1.72× // From static market data
Pool: $14.2K // Static values
```

### After (Dynamic Data)
```typescript
// BettingWidget (for LeBron market)
TOTAL POOL: $2.0K  // Calculated from API (1016 + 984)
Current Odds:
  YES: 2.03×  // From Myriad API (1 / 0.491867)
  NO: 1.97×   // From Myriad API (1 / 0.508133)

// BettingModal (for LeBron market)
Question: "Will LeBron James get traded..." // From API
YES Odds: 2.03×  // Real-time
NO Odds: 1.97×   // Real-time
YES Pool: $1.0K  // From API (1016 shares)
NO Pool: $1.0K   // From API (984 shares)
```

## Testing

### Test the Binary Pool Section

1. Visit `http://localhost:3000/markets/lebron-james`
2. Check the "Binary Market Pool" widget on the right (desktop)
3. Verify:
   - ✅ TOTAL POOL shows calculated value from API
   - ✅ Shows "Current Odds" section
   - ✅ YES odds match Myriad API data
   - ✅ NO odds match Myriad API data
   - ✅ Values update when market data changes

### Test the Place Bet Modal

1. Click "Place Bet" button
2. Modal opens with correct data
3. Verify:
   - ✅ Market question is correct (LeBron James trade)
   - ✅ YES card shows correct odds
   - ✅ NO card shows correct odds
   - ✅ YES pool size is accurate
   - ✅ NO pool size is accurate
   - ✅ Select YES or NO
   - ✅ Enter bet amount (e.g., 100 USDC)
   - ✅ Potential Return calculates correctly: `100 × 2.03 = 203.00 USDC`

### Example Calculation

For the LeBron James market:
```
Market Data from API:
- YES outcome: price = 0.491867, shares = 1016
- NO outcome: price = 0.508133, shares = 984

Calculated Values:
- YES odds = 1 / 0.491867 = 2.03×
- NO odds = 1 / 0.508133 = 1.97×
- Total Pool = 1016 + 984 = 2000 shares = $2.0K

If user bets 100 USDC on YES:
- Potential Return = 100 × 2.03 = 203.00 USDC
- Profit = 203 - 100 = 103 USDC (if YES wins)
```

## Technical Details

### Pool Size Formatting Function
```typescript
const formatPoolSize = (size: number) => {
  if (size >= 1000) {
    return `$${(size / 1000).toFixed(1)}K`;
  }
  return `$${size.toFixed(0)}`;
};
```

### Total Pool Calculation
```typescript
const totalPool = market
  ? market.yesPoolSize + market.noPoolSize
  : 0;
```

### Potential Return Calculation
```typescript
const odds = selectedOutcome === "YES" 
  ? currentMarket.yesOdds 
  : currentMarket.noOdds;
  
const potentialReturn = betAmount
  ? (parseFloat(betAmount) * odds).toFixed(2)
  : "0.00";
```

## Benefits

1. **Accurate Data**: Shows real-time market information from Myriad API
2. **Dynamic Updates**: Values reflect current market state (with 60s cache)
3. **Better UX**: Users see actual odds and pool sizes before betting
4. **Consistent**: Same data source across all components
5. **Scalable**: Works for any market (static or Myriad)

## API Data Source

For the LeBron James market:
- **Source**: Myriad Protocol API
- **Endpoint**: `/markets/3?network_id=59141`
- **Network**: Linea Testnet
- **Refresh**: Every 60 seconds (Next.js cache)
- **Conversion**: Handled by `convertMyriadToBinaryMarket()` in DAL

## Files Modified

1. `components/BettingWidget.tsx` - Added market prop and dynamic calculations
2. `components/BettingModal.tsx` - Fetch markets dynamically, use real odds
3. `components/MarketPage.tsx` - Pass market data to BettingWidget

## No Breaking Changes

- All existing markets continue to work
- Graceful fallback if no market data
- Static markets still display correctly
- Type-safe with TypeScript

## Future Enhancements

1. **Real-time Price Updates**: Add WebSocket support for live odds changes
2. **User Position Tracking**: Show user's current holdings in market
3. **Price Impact**: Display expected price impact of bet size
4. **Slippage Protection**: Add slippage tolerance settings
5. **Historical Odds**: Show odds chart over time
6. **Quote API**: Use Myriad's quote endpoint for exact share calculations

## Verification Checklist

- [x] Binary Pool shows dynamic total pool size
- [x] Current odds section displays YES/NO odds from API
- [x] Betting modal fetches all markets
- [x] Modal displays correct market question
- [x] Modal shows accurate YES/NO odds
- [x] Modal shows accurate pool sizes
- [x] Potential return calculates using real odds
- [x] No linter errors
- [x] TypeScript compilation successful
- [x] Works for both static and Myriad markets

## Testing Commands

```bash
# Start dev server
pnpm dev

# Visit LeBron market
open http://localhost:3000/markets/lebron-james

# Test API endpoint directly
curl http://localhost:3000/api/myriad/lebron
```

## Support

If you encounter issues:
1. Check API key is configured in `.env.local`
2. Verify Myriad API is accessible
3. Check browser console for errors
4. Ensure market data is being fetched
5. Review conversion logic in `dal/market.ts`

---

**Status**: ✅ Complete
**Date**: November 19, 2025
**Impact**: High - Critical for accurate betting functionality

