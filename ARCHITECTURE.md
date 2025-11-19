# Wallet Integration Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        User's Browser                           │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                 MetaMask Extension                       │  │
│  │  • Manages private keys                                  │  │
│  │  • Signs transactions                                    │  │
│  │  • Provides window.ethereum API                          │  │
│  └──────────────────────────────────────────────────────────┘  │
│                           ↕                                     │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              Oasis Application                           │  │
│  │                                                           │  │
│  │  ┌────────────────────────────────────────────────────┐  │  │
│  │  │           WalletProvider (Context)                 │  │  │
│  │  │  • Global wallet state                             │  │  │
│  │  │  • Connection management                           │  │  │
│  │  │  • Event listeners                                 │  │  │
│  │  │  • Auto-reconnect logic                            │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  │                           ↕                               │  │
│  │  ┌─────────────────────────────────────────────────────┐ │  │
│  │  │         Components Using useWallet Hook            │ │  │
│  │  │                                                     │ │  │
│  │  │  • NavbarWrapper                                   │ │  │
│  │  │  • Portfolio Page                                  │ │  │
│  │  │  • WalletInfo (optional)                           │ │  │
│  │  │  • Any future components                           │ │  │
│  │  └─────────────────────────────────────────────────────┘ │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## Component Hierarchy

```
app/layout.tsx
  └── <WalletProvider>
        ├── <Toaster /> (notifications)
        └── <main>
              ├── <NavbarWrapper>
              │     └── <Navbar>
              │           ├── Desktop Connect Button
              │           └── Mobile Menu Connect Button
              │
              ├── /markets (page)
              ├── /agents (page)
              └── /portfolio (page)
                    └── Wallet Connection Check
                          ├── Show prompt if not connected
                          └── Show content if connected
```

## Data Flow

### 1. Initial Page Load

```
User visits site
    ↓
WalletProvider initializes
    ↓
Check localStorage for "walletConnected"
    ↓
If "true" → Auto-connect
    ├─ Query MetaMask for accounts
    ├─ Get provider and signer
    ├─ Get network info
    └─ Update state
    ↓
If "false" → Stay disconnected
    └─ Show "Connect Wallet" button
```

### 2. Connect Wallet Flow

```
User clicks "Connect Wallet"
    ↓
NavbarWrapper.handleWalletAction()
    ↓
WalletContext.connectWallet()
    ↓
Check if MetaMask installed
    ├─ No → Show error + install link
    └─ Yes → Continue
        ↓
    Request accounts from MetaMask
        ↓
    MetaMask popup appears
        ↓
    User approves/rejects
        ↓
    ├─ Approved:
    │   ├─ Store account
    │   ├─ Create provider/signer
    │   ├─ Get chain ID
    │   ├─ Save to localStorage
    │   └─ Show success toast
    │
    └─ Rejected:
        └─ Show error toast
```

### 3. Disconnect Wallet Flow

```
User clicks "Disconnect"
    ↓
NavbarWrapper.handleWalletAction()
    ↓
WalletContext.disconnectWallet()
    ↓
Clear all wallet state
    ├─ account = null
    ├─ provider = null
    ├─ signer = null
    └─ chainId = null
    ↓
Remove from localStorage
    ↓
Show success toast
```

### 4. Account Change Detection

```
User switches account in MetaMask
    ↓
MetaMask emits "accountsChanged" event
    ↓
WalletContext event listener catches it
    ↓
If accounts.length === 0
    ├─ User disconnected in MetaMask
    └─ Call disconnectWallet()
    ↓
If accounts[0] !== current account
    ├─ Update account state
    └─ Show account change toast
```

### 5. Network Change Detection

```
User switches network in MetaMask
    ↓
MetaMask emits "chainChanged" event
    ↓
WalletContext event listener catches it
    ↓
Update chainId state
    ↓
Show network change toast
    ↓
Reload page (MetaMask recommendation)
```

## State Management

### WalletContext State

```typescript
{
  account: string | null,        // "0x1234..."
  isConnected: boolean,           // Derived from !!account
  isConnecting: boolean,          // Loading state
  provider: BrowserProvider | null,
  signer: JsonRpcSigner | null,
  chainId: number | null,         // e.g., 1, 137, 5
  connectWallet: () => Promise<void>,
  disconnectWallet: () => void
}
```

### LocalStorage

```typescript
{
  "walletConnected": "true" | null
}
```

## Key Functions

### connectWallet()

**Purpose**: Initiates MetaMask connection

**Steps**:
1. Check MetaMask installation
2. Request account access
3. Create provider and signer
4. Get network information
5. Update state
6. Save to localStorage
7. Show notification

**Error Handling**:
- MetaMask not installed
- User rejection (code 4001)
- Connection failure
- Generic errors

### disconnectWallet()

**Purpose**: Clears wallet connection

**Steps**:
1. Reset all state to null
2. Remove from localStorage
3. Show notification

### Auto-Connect (useEffect)

**Purpose**: Reconnect previously connected wallets

**Trigger**: Component mount

**Steps**:
1. Check localStorage
2. If connected before, query MetaMask
3. If accounts available, reconnect
4. If not, clear localStorage

## Event Listeners

### accountsChanged

**Emitted by**: MetaMask
**When**: User switches accounts or disconnects
**Handler**: Updates account state or disconnects

### chainChanged

**Emitted by**: MetaMask
**When**: User switches blockchain network
**Handler**: Updates chainId, shows toast, reloads page

## Security Considerations

### ✅ What's Secure

1. **Private Keys Never Accessed**
   - Application never has access to private keys
   - All signing happens in MetaMask

2. **User Approval Required**
   - Every connection must be approved
   - No automatic connections without consent

3. **Proper Event Cleanup**
   - Event listeners removed on unmount
   - Prevents memory leaks

4. **Minimal Data Storage**
   - Only connection status in localStorage
   - No sensitive information stored

### ⚠️ Security Notes

1. **MetaMask Phishing**
   - Users should verify URL before connecting
   - Consider adding site verification

2. **Network Validation**
   - Currently no network restriction
   - Future: Add required network check

3. **Transaction Signing**
   - Not yet implemented
   - When implemented, validate all parameters

## Integration Points

### Current Integration

1. **Navbar**
   - Desktop button (top right)
   - Mobile menu button (bottom)
   - Shows connection status

2. **Portfolio**
   - Requires wallet connection
   - Shows prompt if not connected
   - Displays content when connected

### Future Integration Points

1. **BettingModal**
   - Check connection before bet
   - Use signer to sign transactions
   - Handle approvals

2. **Markets Page**
   - Show connected address
   - Filter by user's positions

3. **Agents Page**
   - Show user's agent interactions
   - Personalized data

## Error Scenarios

| Scenario | Code | Handling |
|----------|------|----------|
| MetaMask not installed | N/A | Show error with install link |
| User rejected connection | 4001 | Show "Connection Rejected" toast |
| Connection failed | Various | Show "Connection Failed" toast |
| Account switched | N/A | Update state, show notification |
| Network switched | N/A | Update state, show notification, reload |
| MetaMask locked | N/A | Connection fails, prompt to unlock |

## Performance Considerations

### Optimizations

1. **Lazy Provider Creation**
   - Provider only created when needed
   - Not created on every render

2. **Event Listener Cleanup**
   - Properly removed on unmount
   - Prevents memory leaks

3. **State Updates**
   - Batched where possible
   - Minimal re-renders

4. **LocalStorage Checks**
   - Only on mount
   - Not on every render

## Testing Strategy

### Unit Tests (Future)

- Test connectWallet success/failure
- Test disconnectWallet
- Test account change handling
- Test network change handling
- Test auto-connect logic

### Integration Tests (Future)

- Test full connection flow
- Test reconnection on page reload
- Test error scenarios
- Test with different networks

### Manual Testing (Current)

- ✅ Connect wallet on desktop
- ✅ Connect wallet on mobile
- ✅ Disconnect wallet
- ✅ Switch accounts
- ✅ Switch networks
- ✅ Refresh page
- ✅ Test without MetaMask

## Browser Compatibility

### Supported

- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Edge
- ✅ Brave
- ✅ Opera

### Requirements

- Modern JavaScript support
- localStorage available
- window.ethereum provided by MetaMask

## Future Architecture Considerations

### Upcoming Features

1. **Smart Contract Integration**
   - Add contract interaction layer
   - Separate concerns (UI, wallet, contracts)

2. **Multi-Wallet Support**
   - Abstract wallet provider
   - Support WalletConnect, Coinbase Wallet

3. **Transaction Queue**
   - Manage multiple pending transactions
   - Show transaction history

4. **State Persistence**
   - Consider using Redux or Zustand
   - Persist more than just connection status

5. **Backend Integration**
   - Sync wallet data with backend
   - User profiles linked to addresses

## Dependencies Graph

```
ethers.js
    ↓
WalletContext.tsx
    ↓
    ├── NavbarWrapper.tsx → Navbar.tsx
    ├── Portfolio Page
    └── (Future) Other Components
```

## File Size Impact

| File | Size (approx) | Purpose |
|------|---------------|---------|
| WalletContext.tsx | ~7KB | Core wallet logic |
| NavbarWrapper.tsx | ~0.5KB | Bridge component |
| WalletInfo.tsx | ~2KB | Display component |
| ethers.js | ~400KB | Web3 library |

**Total Bundle Impact**: ~410KB (mostly ethers.js)

## Conclusion

The wallet integration is built with:
- ✅ Clean separation of concerns
- ✅ Reusable components
- ✅ Type safety (TypeScript)
- ✅ Error handling
- ✅ User-friendly notifications
- ✅ Security best practices
- ✅ Performance optimizations

Ready for production use and future blockchain integration!

