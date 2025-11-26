# Myriad Integration Setup Checklist

Use this checklist to ensure your Myriad Protocol integration is set up correctly.

## Pre-Setup

- [ ] I have contacted the Myriad Protocol team
- [ ] I have received my API key
- [ ] I have Node.js 18+ installed
- [ ] I have pnpm installed

## Environment Setup

- [ ] Created `.env.local` file in project root
- [ ] Added `NEXT_PUBLIC_MYRIAD_API_KEY` with my API key
- [ ] Added `NEXT_PUBLIC_MYRIAD_API_URL` with staging URL
- [ ] Verified `.env.local` is in `.gitignore`

**Example `.env.local`:**
```env
NEXT_PUBLIC_MYRIAD_API_KEY=myr_sk_liv_your_actual_key_here
NEXT_PUBLIC_MYRIAD_API_URL=https://api-v2.staging.myriadprotocol.com
```

## Installation

- [ ] Ran `pnpm install` successfully
- [ ] No dependency errors
- [ ] All packages installed

## Development Server

- [ ] Started dev server with `pnpm dev`
- [ ] Server running on http://localhost:3000
- [ ] No compilation errors
- [ ] No API key warnings in console

## Testing - Markets List Page

- [ ] Visited http://localhost:3000/markets
- [ ] Page loads without errors
- [ ] LeBron James market appears in the grid
- [ ] Market shows live data (not just placeholders)
- [ ] Volume shows a number (e.g., $62.99)
- [ ] YES/NO probabilities display
- [ ] Basketball emoji (🏀) shows on market tag

## Testing - Market Detail Page

- [ ] Clicked on LeBron James market
- [ ] URL changed to `/markets/lebron-james`
- [ ] Market detail page loads
- [ ] All market information displays:
  - [ ] Market question
  - [ ] YES/NO odds
  - [ ] Volume and liquidity
  - [ ] Time remaining
  - [ ] Network badge (Linea Testnet)
- [ ] No 404 error
- [ ] No loading errors

## Testing - Navigation

- [ ] Can navigate between markets using arrows
- [ ] Pagination dots show at bottom (mobile)
- [ ] Market counter shows correct position
- [ ] Can swipe between markets on mobile
- [ ] All markets load correctly

## Testing - API Endpoints

Test these URLs in your browser or with curl:

- [ ] http://localhost:3000/api/myriad/lebron
  - Should return JSON with market data
  - No error messages
  
- [ ] http://localhost:3000/api/myriad/markets?networkId=59141
  - Should return array of markets
  - Includes LeBron market

## Console Checks

Open browser DevTools Console and verify:

- [ ] No red errors
- [ ] No "API key not configured" messages
- [ ] No failed network requests to Myriad API
- [ ] Market data logged successfully (if any logs present)

## Browser Network Tab

Check the Network tab in DevTools:

- [ ] Requests to Myriad API are successful (Status 200)
- [ ] No 401 Unauthorized errors
- [ ] No 429 Rate Limit errors
- [ ] Response contains market data

## Data Verification

Verify the LeBron market displays correct data:

- [ ] Question: "Will LeBron James get traded before the 2025-26 NBA Season?"
- [ ] Market type: Sports (🏀)
- [ ] Status: LIVE or UPCOMING (depends on current date)
- [ ] Network: Linea Testnet
- [ ] Two outcomes: YES and NO
- [ ] Prices are between $0.00 and $1.00
- [ ] Volume is a positive number

## Error Handling Tests

Test that errors are handled gracefully:

### Test 1: Invalid API Key
- [ ] Changed API key to invalid value in `.env.local`
- [ ] Restarted dev server
- [ ] Static markets still show
- [ ] Console shows helpful error message
- [ ] App doesn't crash

### Test 2: No API Key
- [ ] Removed API key from `.env.local`
- [ ] Restarted dev server
- [ ] Static markets still show
- [ ] Error message indicates missing API key
- [ ] App doesn't crash

### Test 3: Network Offline
- [ ] Turned off WiFi/Network
- [ ] Refreshed page
- [ ] Static markets still display
- [ ] LeBron market gracefully fails
- [ ] No breaking errors

## Mobile Testing

If you have a mobile device or can use browser DevTools mobile mode:

- [ ] Responsive layout works on mobile
- [ ] Markets grid stacks properly
- [ ] Swipe gestures work (if on real device)
- [ ] All buttons are tappable
- [ ] Text is readable
- [ ] No horizontal scrolling

## Performance Checks

- [ ] Markets list loads in < 2 seconds
- [ ] Market detail page loads in < 1 second
- [ ] No layout shifts during load
- [ ] Smooth navigation between markets
- [ ] No memory leaks (check DevTools Performance tab)

## Code Quality

- [ ] Ran `pnpm lint` with no errors
- [ ] TypeScript compilation successful
- [ ] No unused imports
- [ ] All types properly defined

## Documentation Review

- [ ] Read `MYRIAD_SETUP.md`
- [ ] Read `MYRIAD_SUMMARY.md`
- [ ] Reviewed `QUICK_REFERENCE.md`
- [ ] Understand data flow from `ARCHITECTURE_DIAGRAM.md`
- [ ] Know where to find detailed docs (`MYRIAD_IMPLEMENTATION.md`)

## Production Preparation

Before deploying to production:

- [ ] Obtained production API key from Myriad
- [ ] Tested with production API key in staging environment
- [ ] Verified rate limits are acceptable
- [ ] Set up error monitoring (Sentry, etc.)
- [ ] Configured environment variables on hosting platform
- [ ] Tested deployed version
- [ ] Verified API calls work in production
- [ ] Checked CORS if applicable

## Security Checklist

- [ ] `.env.local` is NOT committed to git
- [ ] API key is stored securely
- [ ] API key is not exposed in client-side code
- [ ] API key is not logged to console
- [ ] Production API key is different from staging

## Troubleshooting Reference

If you encounter issues, refer to:

1. **Setup Issues** → `MYRIAD_SETUP.md`
2. **Technical Questions** → `MYRIAD_IMPLEMENTATION.md`
3. **Quick Answers** → `QUICK_REFERENCE.md`
4. **Architecture Questions** → `ARCHITECTURE_DIAGRAM.md`

## Common Issues & Solutions

### Issue: "Myriad API key not configured"
**Solution:** 
- Create `.env.local` file
- Add `NEXT_PUBLIC_MYRIAD_API_KEY=your_key`
- Restart dev server

### Issue: Market not showing
**Solution:**
- Check API key is valid
- Check console for errors
- Verify network connectivity
- Check Myriad API status

### Issue: Stale data
**Solution:**
- Clear browser cache
- Restart dev server
- Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

### Issue: 404 on market page
**Solution:**
- Verify URL is `/markets/lebron-james`
- Check DAL `getMarketById` function
- Ensure API returns data

## Support Contacts

- **Myriad API Issues:** Contact Myriad Protocol team
- **Technical Issues:** Check documentation files
- **Next.js Help:** See Next.js documentation

## Final Verification

Before considering setup complete:

- [ ] All checkboxes above are checked
- [ ] LeBron market displays correctly
- [ ] Can navigate between all markets
- [ ] API endpoints respond correctly
- [ ] No errors in console
- [ ] Performance is acceptable
- [ ] Documentation reviewed
- [ ] Ready for production (if applicable)

---

## Setup Complete! 🎉

If all items are checked, your Myriad Protocol integration is complete and working correctly.

**Next Steps:**
1. Start building features
2. Add more Myriad markets if needed
3. Implement trading functionality
4. Deploy to production

**Need Help?**
- Review documentation files
- Check troubleshooting section
- Contact Myriad Protocol team for API issues

