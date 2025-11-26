# Myriad Market Extended UI Preview

## New UI Components on LeBron James Market Page

### 1. Market Timeline
```
┌─────────────────────────────────────────────┐
│ Market Timeline                              │
├─────────────────────────────────────────────┤
│ 📅 Published                                 │
│    November 26, 2025, 11:11 AM UTC          │
│                                              │
│ 🕐 Market Close                              │
│    October 20, 2025, 11:59 PM UTC           │
│                                              │
│ 🔗 Resolution Source - NBA                   │
│    https://www.nba.com/lakers/news          │
└─────────────────────────────────────────────┘
```

### 2. Token Information
```
┌─────────────────────────────────────────────┐
│ Token Information                            │
├─────────────────────────────────────────────┤
│ Token                                        │
│ USDC (USDC)                                  │
│                                              │
│ Contract Address                             │
│ 0x82Be67E8...e20d20f  📋 🔗                  │
│                                              │
│ Decimals                                     │
│ 18                                           │
└─────────────────────────────────────────────┘
```

### 3. Market Details
```
┌─────────────────────────────────────────────┐
│ Market Details                               │
├─────────────────────────────────────────────┤
│ Network                                      │
│ Linea Sepolia Testnet                        │
│                                              │
│ Market Slug                                  │
│ will-lebron-james-get-traded-before...      │
│                                              │
│ Volume (24h)         $0.00                   │
│ Liquidity Price      $0.99987                │
│ Total Shares         2000.26                 │
│                                              │
│ Market Status                                │
│ ┌──────────┐ ┌──────────────┐              │
│ │ ✓ Valid  │ │ ℹ️ Not In Play│              │
│ └──────────┘ └──────────────┘              │
└─────────────────────────────────────────────┘
```

### 4. Fee Structure
```
┌─────────────────────────────────────────────┐
│ Fee Structure                                │
├─────────────────────────────────────────────┤
│ BUY FEES                                     │
│ Total Fee             0.00%                  │
│ Treasury Fee          0.00%                  │
│ Distributor Fee       0.00%                  │
│                                              │
│ SELL FEES                                    │
│ Total Fee             0.00%                  │
│ Treasury Fee          0.00%                  │
│ Distributor Fee       0.00%                  │
└─────────────────────────────────────────────┘
```

### 5. Outcome Details
```
┌─────────────────────────────────────────────┐
│ Outcome Details                              │
├─────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────┐ │
│ │ 🏀 Yes              49.2% 📈 +0.00%     │ │
│ │ Outcome #0                              │ │
│ │                                         │ │
│ │ Total Shares    Shares Held             │ │
│ │ 1016.40         46.60                   │ │
│ │                                         │ │
│ │ Price History Available                 │ │
│ │ 📊 24h (289 points)                     │ │
│ └─────────────────────────────────────────┘ │
│                                              │
│ ┌─────────────────────────────────────────┐ │
│ │ 🏀 No               50.8% 📉 +0.00%     │ │
│ │ Outcome #1                              │ │
│ │                                         │ │
│ │ Total Shares    Shares Held             │ │
│ │ 983.86          0.00                    │ │
│ │                                         │ │
│ │ Price History Available                 │ │
│ │ 📊 24h (289 points)                     │ │
│ └─────────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
```

## Page Layout

```
┌────────────────────────────────────────────────────────────────┐
│                          NAVBAR                                 │
├────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────────────┐  ┌──────────────────────┐       │
│  │                          │  │                      │       │
│  │   MARKET HEADER          │  │   BETTING WIDGET     │       │
│  │   (Title, Agent, etc)    │  │                      │       │
│  │                          │  └──────────────────────┘       │
│  ├──────────────────────────┤                                 │
│  │                          │                                 │
│  │  METRICS BREAKDOWN       │                                 │
│  │                          │                                 │
│  ├──────────────────────────┤                                 │
│  │                          │                                 │
│  │  MARKET DATA TABS        │                                 │
│  │  (Performance Graph)     │                                 │
│  │                          │                                 │
│  ├──────────────────────────┤                                 │
│  │                          │                                 │
│  │  MARKET INFO SECTION     │                                 │
│  │  (Description)           │                                 │
│  │                          │                                 │
│  ├──────────────────────────┤  ← NEW SECTIONS BELOW          │
│  │                          │                                 │
│  │  🆕 MARKET TIMELINE      │                                 │
│  │                          │                                 │
│  ├──────────────────────────┤                                 │
│  │                          │                                 │
│  │  🆕 TOKEN INFORMATION    │                                 │
│  │                          │                                 │
│  ├──────────────────────────┤                                 │
│  │                          │                                 │
│  │  🆕 MARKET DETAILS       │                                 │
│  │                          │                                 │
│  ├──────────────────────────┤                                 │
│  │                          │                                 │
│  │  🆕 FEE STRUCTURE        │                                 │
│  │                          │                                 │
│  ├──────────────────────────┤                                 │
│  │                          │                                 │
│  │  🆕 OUTCOME DETAILS      │                                 │
│  │                          │                                 │
│  └──────────────────────────┘                                 │
│                                                                 │
└────────────────────────────────────────────────────────────────┘
```

## Key Features

### Interactive Elements
- **Copy Button**: Click to copy token contract address to clipboard
- **Explorer Link**: Opens Linea Sepolia block explorer in new tab
- **Resolution Source**: Clickable link to official NBA news page
- **Status Badges**: Color-coded indicators for market state

### Data Visualization
- **Price Changes**: Green/red with trend arrows for 24h changes
- **Status Indicators**: 
  - ✓ Valid (green) / ✗ Voided (red)
  - In Play (blue) / Not In Play (gray)
  - Perpetual (purple)
  - Moneyline (orange)

### Information Architecture
1. **Timeline First**: Shows when market starts/ends
2. **Token Info**: Critical for blockchain interaction
3. **Market Details**: Overall statistics and metadata
4. **Fee Structure**: Transparency for traders
5. **Outcome Details**: Deep dive into each outcome

## Responsive Design

### Desktop (> 768px)
- All panels display in full width
- Side-by-side layout where appropriate
- Hover effects on interactive elements

### Mobile (< 768px)
- Stacked layout for all panels
- Touch-friendly button sizes
- Condensed font sizes
- Full-width panels for readability

## Data Accuracy

All data is pulled directly from the Myriad API response:
- ✅ Real-time prices
- ✅ Actual contract addresses
- ✅ Live volume and liquidity
- ✅ Historical price data references
- ✅ Official resolution sources

## Benefits

1. **Transparency**: Users see all market data
2. **Verification**: Contract addresses and sources are verifiable
3. **Education**: Users learn about market structure
4. **Trust**: Complete disclosure of fees and mechanics
5. **Analysis**: Historical data references for deeper research

