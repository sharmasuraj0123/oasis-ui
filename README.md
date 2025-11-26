# Oasis - Prediction Markets Platform

A Next.js application for prediction markets with integrated Myriad Protocol API support.

## Features

- 🎯 Binary prediction markets
- 🏀 Live data from Myriad Protocol (LeBron James trade market)
- 📊 Real-time market data and pricing
- 💰 **On-chain betting with MetaMask**
- 🔗 Multi-network support (Linea, Abstract, BNB testnet)
- 🔐 Secure wallet integration
- 🎨 Modern, responsive UI
- 📱 Mobile-optimized interface

## Getting Started

### Prerequisites

- Node.js 18+ installed
- pnpm package manager
- Myriad Protocol API key (contact Myriad team)

### Installation

1. Clone the repository
2. Install dependencies:

```bash
pnpm install
```

3. Create `.env.local` file with your Myriad API key:

```env
NEXT_PUBLIC_MYRIAD_API_KEY=myr_sk_liv_your_key_here
NEXT_PUBLIC_MYRIAD_API_URL=https://api-v2.staging.myriadprotocol.com
```

4. Run the development server:

```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) to see the app

The app will redirect to `/markets` where you can see all prediction markets, including the live LeBron James market from Myriad Protocol.

## Project Structure

```
oasis/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   └── myriad/       # Myriad Protocol integration
│   ├── markets/          # Market pages
│   ├── agents/           # Agent pages
│   └── portfolio/        # User portfolio
├── components/            # React components
├── lib/                   # Utilities and clients
│   ├── types/            # TypeScript types
│   └── myriad-client.ts  # Myriad API client
├── dal/                   # Data Access Layer
└── public/               # Static assets
```

## Myriad Protocol Integration

This app integrates with Myriad Protocol to fetch live prediction market data. The LeBron James trade market is fetched from the Myriad API and displayed alongside static markets.

### Documentation

- **[MYRIAD_SETUP.md](MYRIAD_SETUP.md)** - Setup instructions for Myriad API
- **[MYRIAD_IMPLEMENTATION.md](MYRIAD_IMPLEMENTATION.md)** - Complete technical documentation
- **[QUICK_REFERENCE.md](QUICK_REFERENCE.md)** - Quick reference guide
- **[MYRIAD_SUMMARY.md](MYRIAD_SUMMARY.md)** - Implementation summary
- **[ARCHITECTURE_DIAGRAM.md](ARCHITECTURE_DIAGRAM.md)** - Visual architecture guide
- **[BETTING_FUNCTIONALITY.md](BETTING_FUNCTIONALITY.md)** - Betting system documentation
- **[BETTING_QUICK_START.md](BETTING_QUICK_START.md)** - Quick start guide for betting
- **[DYNAMIC_BETTING_UPDATE.md](DYNAMIC_BETTING_UPDATE.md)** - Dynamic data integration

### Quick Links

- `/markets` - View all markets
- `/markets/lebron-james` - LeBron James trade market (with betting!)
- `/api/myriad/lebron` - API endpoint for LeBron market

### Betting

Users can now place real on-chain bets:
1. Connect MetaMask wallet
2. Choose YES or NO outcome
3. Enter bet amount
4. Confirm transaction
5. Bet executes on-chain!

**See:** [BETTING_QUICK_START.md](BETTING_QUICK_START.md) for step-by-step guide

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI
- **Charts:** Recharts
- **Blockchain:** Ethers.js
- **APIs:** Myriad Protocol

## Features in Detail

### Markets
- Live and upcoming prediction markets
- Real-time odds and pricing
- Volume and liquidity tracking
- Market filtering and sorting

### Agents
- Trading agents with performance metrics
- Strategy details and backtesting
- Agent comparison tools

### Portfolio
- User bet tracking
- P&L visualization
- Position management

### Wallet Integration
- Connect with MetaMask and other wallets
- View balances and transactions
- Sign messages and transactions

## Development

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

### Environment Variables

Required for Myriad integration:
- `NEXT_PUBLIC_MYRIAD_API_KEY` - Your Myriad API key
- `NEXT_PUBLIC_MYRIAD_API_URL` - Myriad API base URL

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project to Vercel
3. Add environment variables
4. Deploy

### Other Platforms

Add the required environment variables to your hosting platform and follow standard Next.js deployment procedures.

## Learn More

### Next.js Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js App Router](https://nextjs.org/docs/app)

### Myriad Protocol
- [Myriad Documentation](https://help.myriad.markets/developer-docs-v2)
- [Myriad API Reference](https://api-v2.staging.myriadprotocol.com)

### Related Docs
- [Wallet Integration Guide](WALLET_INTEGRATION.md)
- [Architecture Overview](ARCHITECTURE.md)
- [Quick Start Guide](QUICK_START.md)

## Support

For issues or questions:
- Myriad API: Contact Myriad Protocol team
- Application: Check documentation files
- Next.js: See Next.js documentation

## License

This project is private and proprietary.
