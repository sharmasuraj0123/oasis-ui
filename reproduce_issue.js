
// const fetch = require('node-fetch'); // Native fetch in Node 18+

const API_KEY = "myr_sk_dev_ks5sue883qizpfjugos62ci391y7mw5u6oz4f9xjbj";
const API_URL = "https://api-v2.staging.myriadprotocol.com";

async function testQuote() {
    const request = {
        market_id: 3,
        network_id: 59141,
        outcome_id: 0,
        action: "sell",
        shares: 10,
        slippage: 0.01
    };

    console.log("Requesting quote:", request);

    try {
        const response = await fetch(`${API_URL}/markets/quote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": API_KEY,
            },
            body: JSON.stringify(request),
        });

        if (!response.ok) {
            console.error("API Error:", response.status, response.statusText);
            const text = await response.text();
            console.error("Body:", text);
            return;
        }

        const data = await response.json();
        console.log("Response:", JSON.stringify(data, null, 2));

        if (!data.calldata) {
            console.error("CRITICAL: calldata is missing or empty!");
        } else {
            console.log("calldata length:", data.calldata.length);
            console.log("calldata start:", data.calldata.substring(0, 10));
        }

    } catch (error) {
        console.error("Fetch error:", error);
    }
}


async function checkMarket() {
    try {
        const response = await fetch(`${API_URL}/markets/3?network_id=59141`, {
            headers: { "x-api-key": API_KEY }
        });
        const data = await response.json();
        console.log("Market Status:", data.state);
        console.log("Market Expires:", data.expiresAt);
    } catch (e) {
        console.error(e);
    }
}

checkMarket();
testQuote();
