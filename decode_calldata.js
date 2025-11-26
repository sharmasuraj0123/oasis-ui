// Decode the calldata to understand what function we're calling
const calldata = "0x1281311d00000000000000000000000000000000000000000000000000000000000000030000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004781a589b95393000000000000000000000000000000000000000000000000002386f26fc10000";

// Function selector (first 4 bytes)
const selector = calldata.slice(0, 10);
console.log("Function Selector:", selector);

// Parameters (rest of the data, each parameter is 32 bytes = 64 hex characters)
const params = calldata.slice(10);
console.log("\nParameters (raw):", params);

// Split into 32-byte chunks
const param1 = "0x" + params.slice(0, 64);
const param2 = "0x" + params.slice(64, 128);
const param3 = "0x" + params.slice(128, 192);
const param4 = "0x" + params.slice(192, 256);

console.log("\nParameter 1 (marketId?):", param1, "→", BigInt(param1).toString());
console.log("Parameter 2 (outcomeId?):", param2, "→", BigInt(param2).toString());
console.log("Parameter 3 (shares threshold?):", param3, "→", BigInt(param3).toString());
console.log("Parameter 4 (value/amount?):", param4, "→", BigInt(param4).toString());

// Convert param 4 to decimal USDC (6 decimals)
const valueInTokens = Number(BigInt(param4)) / 1e6;
console.log("\nParameter 4 in USDC (6 decimals):", valueInTokens);
