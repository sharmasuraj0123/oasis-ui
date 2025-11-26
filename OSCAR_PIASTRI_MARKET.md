# Oscar Piastri F1 Market Implementation

## Overview
Added a new market for "Will Oscar Piastri win the F1 Drivers Championship 2025?" from Myriad Protocol.

## Market Details
- **Market ID:** 1 (on Myriad)
- **Network:** Linea Testnet (59141)
- **Question:** "Will Oscar Piastri win the F1 Drivers Championship 2025?"
- **Internal ID:** `oscar-piastri` or `myriad-1`
- **Market Tag:** Formula 1 🏎️

## Files Modified/Created

### 1. `lib/myriad-client.ts`
**Added:**
```typescript
export async function fetchOscarPiastriMarket(): Promise<MyriadMarket> {
	const PIASTRI_MARKET_ID = 1;
	const LINEA_TESTNET_ID = 59141;

	try {
		return await fetchMyriadMarket(PIASTRI_MARKET_ID, LINEA_TESTNET_ID);
	} catch (error) {
		console.error("Failed to fetch Oscar Piastri F1 market:", error);
		throw error;
	}
}
```

### 2. `app/api/myriad/piastri/route.ts` (NEW FILE)
Created a new API route to fetch the Oscar Piastri market:
- **Endpoint:** `GET /api/myriad/piastri`
- **Revalidation:** 60 seconds
- **Returns:** MyriadMarket data for Oscar Piastri F1 market

### 3. `dal/market.ts`
**Updated:**
- Imported `fetchOscarPiastriMarket` from myriad-client
- Enhanced `convertMyriadToBinaryMarket()` to auto-detect market types:
  - F1 markets: 🏎️ Formula 1 (Red: #EF4444)
  - NBA markets: 🏀 NBA (Orange: #FF6B00)
  - Default: 🎯 Myriad (Indigo: #6366F1)
- Updated `getMarketById()` to handle:
  - `oscar-piastri` or `myriad-1` → fetches Oscar Piastri market
- Updated `getAllMarkets()` to include Oscar Piastri market in the list

## Market Type Detection
The system now automatically detects market types based on title keywords:
- F1/Formula/Piastri → Formula 1 tag with race car emoji
- LeBron/NBA → NBA tag with basketball emoji

## Access Points

### Direct Market Page
- URL: `http://localhost:3000/markets/oscar-piastri`
- Also accessible via: `http://localhost:3000/markets/myriad-1`

### Markets List
- URL: `http://localhost:3000/markets`
- The Oscar Piastri market will appear in the list alongside other markets

### API Endpoint
- URL: `http://localhost:3000/api/myriad/piastri`
- Returns raw Myriad market data

## Features Inherited
The Oscar Piastri market inherits all features from the Myriad integration:

1. **Real-time Data:**
   - Live prices for YES/NO outcomes
   - Current odds and probabilities
   - 24-hour volume tracking
   - Total volume and liquidity

2. **✅ Betting Functionality (FULLY FUNCTIONAL):**
   - Buy YES or NO shares
   - USDC-based betting on Linea Testnet
   - Automatic token approval handling
   - Gas estimation
   - Transaction tracking
   - Network switching (automatic prompt if on wrong network)
   - Real-time transaction status updates

3. **Market Visualization:**
   - Price charts for outcomes
   - Historical data
   - Fee breakdown
   - Token information

4. **Market Status:**
   - Live/Upcoming/Resolved states
   - Time remaining countdown
   - Expiration tracking

## Betting Implementation Details

### Updated Files for Betting Support

#### `components/BettingModal.tsx`
**Changes:**
- Added `oscar-piastri` to the list of recognized Myriad markets
- Market detection now checks for: `myriad-*`, `lebron-james`, or `oscar-piastri`
- Added specific handling for Oscar Piastri market (Market ID 1 on Linea Testnet)
- When betting on Oscar Piastri market, fetches fresh data via `fetchMyriadMarket(1, 59141)`

**Betting Flow:**
1. User selects YES or NO outcome
2. User enters bet amount in USDC
3. Modal checks wallet connection
4. Modal verifies user is on Linea Testnet (59141)
5. If wrong network, prompts user to switch
6. Fetches quote from Myriad API
7. Requests USDC approval (if needed)
8. Executes buy transaction with calldata from quote
9. Waits for confirmation
10. Shows success toast with transaction hash

### Testing Betting on Oscar Piastri Market

**Prerequisites:**
1. MetaMask or compatible wallet installed
2. Linea Testnet configured in wallet
3. Testnet ETH for gas (get from [Linea Faucet](https://faucet.goerli.linea.build/))
4. Testnet USDC at `0xFEce4462D57bD51A6A552365A011b95f0E16d9B7`

**Steps:**
1. Navigate to: `http://localhost:3000/markets/oscar-piastri`
2. Click "Place Bet" button
3. Select YES or NO outcome
4. Enter bet amount (e.g., "10" for 10 USDC)
5. Click "Connect Wallet" if not connected
6. Approve USDC spending when prompted
7. Confirm transaction in wallet
8. Wait for confirmation

**Expected Result:**
- Toast notification: "Bet placed successfully!"
- Transaction hash displayed
- Link to view on Linea Testnet block explorer

## Testing

To verify the implementation:

1. Start the dev server:
   ```bash
   npm run dev
   ```

2. Visit the markets page:
   ```
   http://localhost:3000/markets
   ```

3. Look for the Oscar Piastri F1 market with the 🏎️ icon

4. Click to view detailed market page

5. Test betting functionality with testnet USDC

## Next Steps

If you need to add more Myriad markets in the future:

1. Add a new fetch function in `lib/myriad-client.ts`:
   ```typescript
   export async function fetchYourMarket(): Promise<MyriadMarket> {
     const YOUR_MARKET_ID = X;
     const LINEA_TESTNET_ID = 59141;
     return await fetchMyriadMarket(YOUR_MARKET_ID, LINEA_TESTNET_ID);
   }
   ```

2. Create API route in `app/api/myriad/[your-market]/route.ts`

3. Update `dal/market.ts`:
   - Import the new fetch function
   - Add market ID check in `getMarketById()`
   - Add market fetch in `getAllMarkets()`
   - Optionally add keyword detection for automatic tagging

## Notes

- Market ID 1 on Myriad corresponds to Oscar Piastri F1 Championship
- Network ID 59141 is Linea Testnet
- All betting transactions use testnet USDC
- Market data refreshes every 60 seconds via Next.js revalidation

