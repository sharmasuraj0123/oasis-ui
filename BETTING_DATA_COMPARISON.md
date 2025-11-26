# Betting Data: Before vs After

## Visual Comparison

### Binary Market Pool Widget

#### BEFORE (Static Data)
```
┌─────────────────────────────────────┐
│ Binary Market Pool     🔼           │
│ Pick YES or NO                      │
│                                     │
│ ┌────────────┐  ┌────────────┐    │
│ │ TOTAL POOL │  │ YOUR BETS  │    │
│ │  $23,430   │  │     0      │    │  ← Hardcoded
│ └────────────┘  └────────────┘    │
│                                     │
│ [        Place Bet        ]         │
│                                     │
│ Most Popular                        │
│ GTrader              1.72×          │  ← Static
└─────────────────────────────────────┘
```

#### AFTER (Dynamic Data from Myriad API)
```
┌─────────────────────────────────────┐
│ Binary Market Pool     🔼           │
│ Pick YES or NO                      │
│                                     │
│ ┌────────────┐  ┌────────────┐    │
│ │ TOTAL POOL │  │ YOUR BETS  │    │
│ │   $2.0K    │  │     0      │    │  ← Calculated from API
│ └────────────┘  └────────────┘    │     (1016 + 984 shares)
│                                     │
│ [        Place Bet        ]         │
│                                     │
│ Current Odds                        │
│ YES                 2.03×           │  ← Live from API
│ NO                  1.97×           │  ← Live from API
└─────────────────────────────────────┘
```

---

## Place Bet Modal

### BEFORE (Static Data)

```
┌──────────────────────────────────────────────┐
│                                          ✕   │
│  Place Your Bet                              │
│  Pick a side. Watch live. Settle at T+7d.   │
│                                              │
│  ┌──────────────────────────────────────┐  │
│  │ 🤖 PREDICTION MARKET                 │  │
│  │ Will GTrader's ROI outperform...     │  │  ← Static question
│  └──────────────────────────────────────┘  │
│                                              │
│  Select Outcome                              │
│  ┌──────────────┐  ┌──────────────┐        │
│  │ 🟢 YES    ✓  │  │ 🔴 NO        │        │
│  │              │  │              │        │
│  │ Odds: 1.72×  │  │ Odds: 2.15×  │        │  ← Static odds
│  │ Pool: $14.2K │  │ Pool: $9.8K  │        │  ← Static pools
│  └──────────────┘  └──────────────┘        │
│                                              │
│  Amount (USDC)                               │
│  [    100      ]                             │
│  [+10] [+50] [+100] [Max]                   │
│                                              │
│  Potential Return:        172.00 USDC       │  ← Based on static odds
│  Fee (1.0%):                1.00 USDC       │
│                                              │
│  [        Place Bet         ]                │
└──────────────────────────────────────────────┘
```

### AFTER (Dynamic Data from Myriad API)

```
┌──────────────────────────────────────────────┐
│                                          ✕   │
│  Place Your Bet                              │
│  Pick a side. Watch live. Settle at T+7d.   │
│                                              │
│  ┌──────────────────────────────────────┐  │
│  │ 🏀 PREDICTION MARKET                 │  │
│  │ Will LeBron James get traded before  │  │  ← Real question from API
│  │ the 2025-26 NBA Season?              │  │
│  └──────────────────────────────────────┘  │
│                                              │
│  Select Outcome                              │
│  ┌──────────────┐  ┌──────────────┐        │
│  │ 🟢 YES    ✓  │  │ 🔴 NO        │        │
│  │              │  │              │        │
│  │ Odds: 2.03×  │  │ Odds: 1.97×  │        │  ← Live odds from API
│  │ Pool: $1.0K  │  │ Pool: $1.0K  │        │  ← Live pools from API
│  └──────────────┘  └──────────────┘        │
│                                              │
│  Amount (USDC)                               │
│  [    100      ]                             │
│  [+10] [+50] [+100] [Max]                   │
│                                              │
│  Potential Return:        203.00 USDC       │  ← Calculated with real odds
│  Fee (1.0%):                1.00 USDC       │     (100 × 2.03 = 203)
│                                              │
│  [        Place Bet         ]                │
└──────────────────────────────────────────────┘
```

---

## Data Source Comparison

### Market: LeBron James Trade

| Field | Before (Static) | After (Dynamic) | Source |
|-------|----------------|-----------------|---------|
| **Question** | "Will GTrader's ROI..." | "Will LeBron James get traded..." | Myriad API |
| **Total Pool** | $23,430 (hardcoded) | $2.0K (calculated) | API: 1016 + 984 shares |
| **YES Odds** | 1.72× | 2.03× | API: 1 / 0.491867 |
| **NO Odds** | 2.15× | 1.97× | API: 1 / 0.508133 |
| **YES Pool** | $14.2K | $1.0K | API: 1016 shares |
| **NO Pool** | $9.8K | $1.0K | API: 984 shares |
| **Potential Return (100 USDC on YES)** | 172.00 USDC | 203.00 USDC | Calculated from real odds |

---

## Calculation Examples

### Example 1: Bet 100 USDC on YES

#### Before (Static Odds)
```
Odds: 1.72×
Bet: 100 USDC
Potential Return: 100 × 1.72 = 172.00 USDC
Profit if wins: 172 - 100 = 72 USDC
```

#### After (Live Odds from API)
```
Odds: 2.03× (from Myriad API)
Bet: 100 USDC
Potential Return: 100 × 2.03 = 203.00 USDC
Profit if wins: 203 - 100 = 103 USDC
```

**Difference:** User sees accurate potential profit (+31 USDC difference)

---

### Example 2: Bet 50 USDC on NO

#### Before (Static Odds)
```
Odds: 2.15×
Bet: 50 USDC
Potential Return: 50 × 2.15 = 107.50 USDC
Profit if wins: 107.5 - 50 = 57.50 USDC
```

#### After (Live Odds from API)
```
Odds: 1.97× (from Myriad API)
Bet: 50 USDC
Potential Return: 50 × 1.97 = 98.50 USDC
Profit if wins: 98.5 - 50 = 48.50 USDC
```

**Difference:** Accurate odds prevent user confusion (-9 USDC difference)

---

## Impact on User Experience

### Before (Static Data Issues)

❌ **Problems:**
- Users see incorrect odds
- Total pool doesn't match reality
- Potential returns are misleading
- Wrong market question displayed
- Can't trust the numbers before betting

### After (Dynamic Data Benefits)

✅ **Improvements:**
- Users see real-time odds from Myriad API
- Total pool matches actual market state
- Accurate potential return calculations
- Correct market question
- Users can make informed betting decisions
- Builds trust in the platform

---

## Data Freshness

### Before
```
Static data → Never updates → Always shows same values
```

### After
```
Myriad API → Next.js Cache (60s) → UI updates every minute
    ↓
Live market data → Accurate odds → Better decisions
```

---

## Implementation Flow

### BettingWidget Component

```typescript
// BEFORE
<div>TOTAL POOL: $23,430</div>  // Hardcoded

// AFTER
const totalPool = market.yesPoolSize + market.noPoolSize;
<div>TOTAL POOL: {formatPoolSize(totalPool)}</div>  // Dynamic
```

### BettingModal Component

```typescript
// BEFORE
import { binaryMarkets } from "../lib/data";
const currentMarket = binaryMarkets[0];  // Static

// AFTER
const [markets, setMarkets] = useState<BinaryMarket[]>([]);
useEffect(() => {
  const allMarkets = await getAllMarkets();  // Fetches from Myriad
  setMarkets(allMarkets);
}, [isOpen]);
```

---

## API Response Example

### Myriad API Response for LeBron Market

```json
{
  "id": 3,
  "title": "Will LeBron James get traded before the 2025-26 NBA Season?",
  "volume": 62.996,
  "liquidity": 1000,
  "outcomes": [
    {
      "id": 0,
      "title": "Yes",
      "price": 0.491867,    ← Used to calculate YES odds (2.03×)
      "shares": 1016        ← YES pool size
    },
    {
      "id": 1,
      "title": "No",
      "price": 0.508133,    ← Used to calculate NO odds (1.97×)
      "shares": 984         ← NO pool size
    }
  ]
}
```

### Conversion to UI Data

```typescript
YES Odds: 1 / 0.491867 = 2.033× → Display: "2.03×"
NO Odds:  1 / 0.508133 = 1.968× → Display: "1.97×"
Total Pool: 1016 + 984 = 2000 → Display: "$2.0K"
```

---

## Testing Scenarios

### Scenario 1: View Binary Pool Widget
1. Navigate to `/markets/lebron-james`
2. Look at "Binary Market Pool" on right side
3. **Verify:** Total Pool shows "$2.0K" (or current API value)
4. **Verify:** Current Odds shows YES: 2.03×, NO: 1.97×

### Scenario 2: Open Place Bet Modal
1. Click "Place Bet" button
2. Modal opens
3. **Verify:** Question is "Will LeBron James get traded..."
4. **Verify:** YES card shows "Odds: 2.03×" and "Pool: $1.0K"
5. **Verify:** NO card shows "Odds: 1.97×" and "Pool: $1.0K"

### Scenario 3: Calculate Potential Return
1. Select YES outcome
2. Enter 100 USDC
3. **Verify:** Potential Return shows "203.00 USDC"
4. **Verify:** Fee shows "1.00 USDC"
5. **Math Check:** 100 × 2.03 = 203 ✓

### Scenario 4: Switch Outcomes
1. Select NO outcome
2. Keep 100 USDC
3. **Verify:** Potential Return changes to "197.00 USDC"
4. **Math Check:** 100 × 1.97 = 197 ✓

---

## Summary

| Aspect | Before | After |
|--------|--------|-------|
| **Data Source** | Hardcoded | Myriad API |
| **Updates** | Never | Every 60s |
| **Accuracy** | ❌ Incorrect | ✅ Accurate |
| **Pool Size** | Static $23K | Dynamic $2K |
| **Odds** | Wrong (1.72×, 2.15×) | Correct (2.03×, 1.97×) |
| **Potential Returns** | Misleading | Accurate |
| **User Trust** | Low | High |
| **Market Question** | Wrong market | Correct market |

**Result:** Users now see accurate, live data for making informed betting decisions on the LeBron James market! 🎉

