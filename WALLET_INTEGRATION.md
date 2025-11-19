# Wallet Integration Guide

## Overview
This application now supports MetaMask wallet connection functionality. Users can connect their MetaMask wallet to interact with the platform.

## Features Implemented

### 1. Wallet Connection
- **Connect Wallet**: Users can connect their MetaMask wallet with a single click
- **Auto-Connect**: Previously connected wallets automatically reconnect on page load
- **Disconnect**: Users can disconnect their wallet at any time
- **Account Switching**: Automatically detects when users switch accounts in MetaMask
- **Network Switching**: Detects network changes and reloads the page accordingly

### 2. User Experience
- **Toast Notifications**: Users receive feedback for all wallet actions:
  - Successful connection with abbreviated address
  - Disconnection confirmation
  - Account switches
  - Network changes
  - Error messages (MetaMask not installed, connection rejected, etc.)
- **Loading States**: Shows loading state while connecting to wallet
- **Responsive Design**: Wallet button works on both desktop and mobile views

### 3. Technical Implementation

#### Files Created/Modified

**New Files:**
- `lib/WalletContext.tsx` - React Context for managing wallet state globally
- `components/NavbarWrapper.tsx` - Wrapper component to connect Navbar with wallet context

**Modified Files:**
- `app/layout.tsx` - Wrapped app with WalletProvider
- `components/Navbar.tsx` - Updated to use wallet connection handler
- `app/portfolio/page.tsx` - Updated to use wallet context for conditional rendering
- `package.json` - Added ethers.js dependency

#### Key Dependencies
- **ethers.js v6.15.0**: Web3 library for Ethereum interactions

## Usage

### For Users

1. **Connect Wallet**:
   - Click the "Connect Wallet" button in the navigation bar
   - Approve the connection request in MetaMask
   - Your wallet address will be displayed (abbreviated)

2. **Disconnect Wallet**:
   - Click the "Disconnect" button in the navigation bar
   - Your wallet will be disconnected from the application

3. **View Portfolio**:
   - Navigate to the Portfolio page
   - If not connected, you'll see a prompt to connect your wallet
   - Once connected, you can view your active and completed bets

### For Developers

#### Using the Wallet Context

```typescript
import { useWallet } from "@/lib/WalletContext";

function YourComponent() {
  const { 
    account,        // Connected wallet address
    isConnected,    // Connection status (boolean)
    isConnecting,   // Loading state (boolean)
    connectWallet,  // Function to connect wallet
    disconnectWallet, // Function to disconnect wallet
    provider,       // ethers BrowserProvider instance
    signer,         // ethers JsonRpcSigner instance
    chainId         // Current chain ID (number)
  } = useWallet();

  // Use wallet state and functions
}
```

#### Example: Checking Connection Status

```typescript
const { isConnected, account } = useWallet();

if (!isConnected) {
  return <div>Please connect your wallet</div>;
}

return <div>Connected: {account}</div>;
```

#### Example: Initiating Connection

```typescript
const { connectWallet, isConnecting } = useWallet();

<button onClick={connectWallet} disabled={isConnecting}>
  {isConnecting ? "Connecting..." : "Connect Wallet"}
</button>
```

## Security Considerations

1. **No Private Keys**: The application never has access to users' private keys
2. **MetaMask Integration**: All transactions are signed through MetaMask's secure interface
3. **Local Storage**: Only connection status is stored locally (no sensitive data)
4. **Event Listeners**: Properly cleaned up to prevent memory leaks

## Browser Requirements

- Modern browser with MetaMask extension installed
- JavaScript enabled
- Web3 provider available (window.ethereum)

## Error Handling

The application handles various error scenarios:

1. **MetaMask Not Installed**: 
   - Shows error toast with link to install MetaMask
   
2. **Connection Rejected**:
   - Shows error toast informing user they rejected the connection
   
3. **Network/Account Changes**:
   - Automatically updates UI and shows notification
   - Reloads page on network change (MetaMask recommendation)

## Future Enhancements

Potential improvements for future versions:

1. **Multi-Wallet Support**: Add support for WalletConnect, Coinbase Wallet, etc.
2. **Network Validation**: Ensure users are on the correct network
3. **Balance Display**: Show user's ETH/token balance
4. **Transaction History**: On-chain transaction tracking
5. **Gas Estimation**: Show estimated gas costs before transactions
6. **ENS Support**: Display ENS names instead of addresses when available

## Testing

To test the wallet integration:

1. **Install MetaMask**: Get the extension from [metamask.io](https://metamask.io/)
2. **Create/Import Wallet**: Set up a wallet in MetaMask
3. **Connect**: Click "Connect Wallet" in the application
4. **Test Features**:
   - Connect wallet
   - Switch accounts in MetaMask
   - Switch networks in MetaMask
   - Disconnect wallet
   - Reload page (test auto-connect)
   - Test mobile menu wallet button

## Troubleshooting

**Wallet won't connect:**
- Ensure MetaMask is installed and unlocked
- Check that you're approving the connection request
- Try refreshing the page

**Page keeps reloading:**
- This is expected behavior when switching networks
- MetaMask recommends page reload on network change

**Auto-connect not working:**
- Clear browser cache and localStorage
- Reconnect your wallet

## Support

For issues or questions:
- Check MetaMask documentation: https://docs.metamask.io/
- Check ethers.js documentation: https://docs.ethers.org/

