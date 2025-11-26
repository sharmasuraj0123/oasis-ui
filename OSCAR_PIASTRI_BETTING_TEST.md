# Oscar Piastri F1 Market - Betting Functionality Test Guide

## Overview
This guide helps you verify that betting on the Oscar Piastri F1 market is fully functional.

## Prerequisites Checklist

### 1. Wallet Setup
- [ ] MetaMask or compatible Web3 wallet installed
- [ ] Wallet connected to the app

### 2. Network Configuration
- [ ] Linea Testnet (Chain ID: 59141) added to wallet
- [ ] Network details:
  - **Name:** Linea Sepolia
  - **RPC URL:** https://rpc.sepolia.linea.build
  - **Chain ID:** 59141
  - **Currency Symbol:** ETH
  - **Block Explorer:** https://sepolia.lineascan.build

### 3. Test Tokens
- [ ] Testnet ETH for gas fees
  - Get from: https://faucet.linea.build/ or https://faucet.goerli.linea.build/
  - Minimum: ~0.01 ETH
  
- [ ] Testnet USDC for betting
  - **Contract:** `0xFEce4462D57bD51A6A552365A011b95f0E16d9B7`
  - **Symbol:** USDC
  - **Decimals:** 6
  - Add token to MetaMask manually

### 4. Getting Testnet USDC
See `GETTING_TESTNET_TOKENS.md` for detailed instructions on obtaining testnet USDC.

## Test Scenarios

### Test 1: Market Discovery
**Goal:** Verify Oscar Piastri market appears in the UI

**Steps:**
1. [ ] Navigate to `http://localhost:3000/markets`
2. [ ] Look for market with 🏎️ Formula 1 tag
3. [ ] Market title should be: "Will Oscar Piastri win the F1 Drivers Championship 2025?"
4. [ ] Market should show LIVE status (if market is open)

**Expected Result:**
- Oscar Piastri market is visible
- Formula 1 tag with race car emoji displayed
- Market card shows YES/NO buttons for LIVE markets

---

### Test 2: Direct Market Access
**Goal:** Access Oscar Piastri market directly

**Steps:**
1. [ ] Navigate to `http://localhost:3000/markets/oscar-piastri`
2. [ ] Page loads successfully
3. [ ] Market information displays correctly

**Expected Result:**
- Market detail page loads
- Price charts visible
- YES/NO odds displayed
- "Place Bet" button visible (if market is LIVE)

---

### Test 3: Open Betting Modal from Markets List
**Goal:** Open betting modal from the markets list page

**Steps:**
1. [ ] Go to `http://localhost:3000/markets`
2. [ ] Find Oscar Piastri market card
3. [ ] Click "YES" button on the market card
4. [ ] Betting modal should open

**Expected Result:**
- Betting modal opens
- Oscar Piastri market is displayed
- YES outcome is pre-selected
- Market shows Formula 1 tag

**Alternative:**
1. [ ] Click "NO" button instead
2. [ ] NO outcome should be pre-selected

---

### Test 4: Open Betting Modal from Market Detail Page
**Goal:** Open betting modal from individual market page

**Steps:**
1. [ ] Navigate to `http://localhost:3000/markets/oscar-piastri`
2. [ ] Click "Place Bet" floating button
3. [ ] Betting modal opens

**Expected Result:**
- Betting modal opens
- Oscar Piastri market displayed
- No outcome pre-selected (user must choose)

---

### Test 5: Wallet Connection Check
**Goal:** Verify wallet connection is required for betting

**Steps:**
1. [ ] Ensure wallet is NOT connected
2. [ ] Open betting modal for Oscar Piastri
3. [ ] Select YES or NO
4. [ ] Enter amount: "10"
5. [ ] Click "Place Bet"

**Expected Result:**
- Error toast appears: "Wallet not connected"
- Toast has "Connect" button
- Clicking "Connect" opens wallet connection flow

---

### Test 6: Network Switching
**Goal:** Verify automatic network switching

**Steps:**
1. [ ] Connect wallet
2. [ ] Switch to wrong network (e.g., Ethereum Mainnet)
3. [ ] Open betting modal for Oscar Piastri
4. [ ] Select YES
5. [ ] Enter amount: "10"
6. [ ] Click "Place Bet"

**Expected Result:**
- Toast appears: "Switching network..."
- MetaMask prompts to switch to Linea Sepolia
- After switching, bet process continues
- If network doesn't exist, prompts to add it

---

### Test 7: Successful YES Bet
**Goal:** Place a successful bet on YES outcome

**Steps:**
1. [ ] Ensure connected to Linea Testnet
2. [ ] Have at least 10 USDC and 0.01 ETH in wallet
3. [ ] Open betting modal for Oscar Piastri
4. [ ] Select "YES" outcome
5. [ ] Enter amount: "10"
6. [ ] Review odds and potential return
7. [ ] Click "Place Bet"
8. [ ] Approve USDC spending in MetaMask (first time only)
9. [ ] Confirm transaction in MetaMask

**Expected Result:**
- Step 8: "Requesting approval..." toast appears
- MetaMask shows USDC approval request
- After approval: "Requesting approval..." toast may continue
- Transaction confirmation request appears in MetaMask
- After confirming: Processing indicator shows
- Success toast: "Bet placed successfully!"
- Transaction hash displayed in toast
- "View" button links to block explorer
- Modal closes after 2 seconds

**Verification:**
- [ ] Check block explorer link shows successful transaction
- [ ] Check wallet: USDC balance decreased by ~10 USDC
- [ ] Check wallet: Received YES outcome tokens

---

### Test 8: Successful NO Bet
**Goal:** Place a successful bet on NO outcome

**Steps:**
1. [ ] Open betting modal for Oscar Piastri
2. [ ] Select "NO" outcome
3. [ ] Enter amount: "5"
4. [ ] Click "Place Bet"
5. [ ] Approve if needed
6. [ ] Confirm transaction

**Expected Result:**
- Same flow as Test 7
- Bet placed on NO outcome
- Received NO outcome tokens

---

### Test 9: Insufficient Balance
**Goal:** Handle insufficient USDC balance

**Steps:**
1. [ ] Check wallet USDC balance (e.g., 3 USDC)
2. [ ] Open betting modal
3. [ ] Select YES
4. [ ] Enter amount: "10" (more than balance)
5. [ ] Click "Place Bet"

**Expected Result:**
- Error during approval process
- Error message: "Insufficient token balance"
- Clear message about needed vs. available amount

---

### Test 10: Insufficient Gas
**Goal:** Handle insufficient ETH for gas

**Steps:**
1. [ ] Reduce ETH balance to near zero (~0.0001 ETH)
2. [ ] Open betting modal
3. [ ] Select YES
4. [ ] Enter amount: "1"
5. [ ] Click "Place Bet"

**Expected Result:**
- Error message: "Insufficient ETH for gas fees"
- Clear message to add more ETH
- Transaction does not proceed

---

### Test 11: User Rejection
**Goal:** Handle user rejecting transaction

**Steps:**
1. [ ] Open betting modal
2. [ ] Select YES
3. [ ] Enter amount: "5"
4. [ ] Click "Place Bet"
5. [ ] When MetaMask opens, click "Reject"

**Expected Result:**
- Error toast: "You rejected the transaction"
- Modal remains open
- Can try again

---

### Test 12: Small Bet Amount
**Goal:** Test with minimum bet

**Steps:**
1. [ ] Open betting modal
2. [ ] Select YES
3. [ ] Enter amount: "0.01"
4. [ ] Click "Place Bet"
5. [ ] Complete transaction

**Expected Result:**
- Bet processes successfully
- Small amount of outcome tokens received
- Transaction succeeds

---

### Test 13: Large Bet Amount
**Goal:** Test with larger bet (if you have funds)

**Steps:**
1. [ ] Open betting modal
2. [ ] Select YES
3. [ ] Enter amount: "100"
4. [ ] Review potential return
5. [ ] Click "Place Bet"
6. [ ] Complete transaction

**Expected Result:**
- Bet processes successfully
- Larger amount of outcome tokens received
- Odds may shift slightly (slippage)

---

### Test 14: Rapid Bet Attempts
**Goal:** Verify processing state prevents double-betting

**Steps:**
1. [ ] Open betting modal
2. [ ] Select YES
3. [ ] Enter amount: "5"
4. [ ] Click "Place Bet" rapidly multiple times
5. [ ] Observe behavior

**Expected Result:**
- Only one transaction initiated
- Button disabled during processing
- Cannot submit multiple bets simultaneously

---

### Test 15: API Integration
**Goal:** Verify market data fetching

**Steps:**
1. [ ] Open browser DevTools Console
2. [ ] Navigate to Oscar Piastri market
3. [ ] Look for API logs

**Expected Result:**
- Console shows: "=== MYRIAD API REQUEST ==="
- Fetching market data from Myriad
- Market ID: 1
- Network ID: 59141
- Response includes market data, outcomes, prices

---

### Test 16: Quote Generation
**Goal:** Verify betting quotes are fetched

**Steps:**
1. [ ] Open DevTools Console
2. [ ] Open betting modal
3. [ ] Enter amount and click "Place Bet"
4. [ ] Look for quote API logs

**Expected Result:**
- Console shows quote request:
  ```json
  {
    "market_id": 1,
    "network_id": 59141,
    "outcome_id": 0 or 1,
    "action": "buy",
    "value": [amount],
    "slippage": 0.01
  }
  ```
- Quote response includes calldata
- Quote shows fees breakdown

---

## Common Issues and Solutions

### Issue: Market Not Found
**Solution:** 
- Ensure dev server is running
- Check API key is configured
- Verify Myriad API is accessible

### Issue: "This market does not support on-chain betting yet"
**Solution:**
- This error should NOT appear for Oscar Piastri market
- If it does, check `BettingModal.tsx` line 178-180
- Market ID should be in the approved list

### Issue: USDC Approval Never Completes
**Solution:**
- Check MetaMask for pending approval transaction
- Ensure gas price is reasonable
- Try resetting MetaMask account (Settings > Advanced > Reset Account)

### Issue: Transaction Reverted
**Solution:**
- Check USDC balance
- Check market is still open (not resolved)
- Try smaller bet amount
- Increase slippage tolerance

### Issue: Wrong Network After Approval
**Solution:**
- MetaMask may switch networks during approval
- Manually switch back to Linea Testnet
- Try bet again

---

## Success Criteria

✅ **All Tests Passed:**
- [ ] Market appears in list with correct branding
- [ ] Market accessible via direct URL
- [ ] Betting modal opens correctly
- [ ] Wallet connection required
- [ ] Network switching works
- [ ] USDC approval flow works
- [ ] YES bets process successfully
- [ ] NO bets process successfully
- [ ] Error handling works correctly
- [ ] Transaction confirmations display
- [ ] Block explorer links work

---

## Additional Verification

### On-Chain Verification
1. [ ] Visit block explorer: https://sepolia.lineascan.build/
2. [ ] Search for your wallet address
3. [ ] Verify transactions appear:
   - USDC approval transaction
   - Bet transaction
4. [ ] Check token balances updated correctly

### Market State Verification
1. [ ] Refresh market page after betting
2. [ ] Check if odds changed (price impact)
3. [ ] Verify your position appears in market data

---

## Reporting Issues

If any test fails, note:
- Test number that failed
- Error message received
- Console logs
- Transaction hash (if available)
- Wallet address used
- USDC and ETH balances at time of failure

---

## Notes

- First bet requires USDC approval (one-time)
- Approval is for large amount to avoid repeated approvals
- Gas fees vary based on network congestion
- Slippage is set to 1% (0.01)
- Market must be in LIVE status for betting
- All transactions are on Linea Testnet (not real money)

