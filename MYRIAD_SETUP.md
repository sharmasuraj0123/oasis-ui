# Myriad API Integration Setup

## Environment Variables

Create a `.env.local` file in the root of the project with the following variables:

```env
# Myriad Protocol API Configuration
# Get your API key from the Myriad Protocol team
NEXT_PUBLIC_MYRIAD_API_KEY=myr_sk_liv_your_actual_key_here

# Myriad API Base URL (use staging for testing)
NEXT_PUBLIC_MYRIAD_API_URL=https://api-v2.staging.myriadprotocol.com
```

## Getting Your API Key

Contact the Myriad Protocol team through their official channels to request an API key.

## Network Configuration

The LeBron James market is configured for Linea Testnet:
- Network ID: `59141`
- Market ID: `3`
- Market Slug: `will-lebron-james-get-traded-before-the-2025-26-nba-season`

## Testing

After setting up the environment variables, restart your development server:

```bash
pnpm dev
```

The market will be available at `/markets/lebron-james`

