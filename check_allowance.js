// Check the actual allowance on-chain
const { ethers } = require('ethers');

const USDC_ADDRESS = "0xFEce4462D57bD51A6A552365A011b95f0E16d9B7";
const PREDICTION_MARKET = "0xED5CCb260f80A7EB1E5779B02115b4dc25aA3cDE";
const USER_ADDRESS = "0x8648d3351a06B03e039Cd0818379F1717BCDd6B2";

const ERC20_ABI = [
    "function allowance(address owner, address spender) view returns (uint256)",
    "function balanceOf(address account) view returns (uint256)",
    "function decimals() view returns (uint8)"
];

async function checkAllowance() {
    const provider = new ethers.JsonRpcProvider("https://rpc.sepolia.linea.build");
    const usdcContract = new ethers.Contract(USDC_ADDRESS, ERC20_ABI, provider);

    const allowance = await usdcContract.allowance(USER_ADDRESS, PREDICTION_MARKET);
    const balance = await usdcContract.balanceOf(USER_ADDRESS);
    const decimals = await usdcContract.decimals();

    console.log("USDC Decimals:", decimals.toString());
    console.log("User Balance (raw):", balance.toString());
    console.log("User Balance (formatted):", ethers.formatUnits(balance, decimals), "USDC");
    console.log("\nAllowance (raw):", allowance.toString());
    console.log("Allowance (formatted):", ethers.formatUnits(allowance, decimals), "USDC");
    console.log("\nRequired for transaction: 10000 raw units = 0.01 USDC");
    console.log("Is allowance sufficient?", allowance >= 10000n);
}

checkAllowance().catch(console.error);
