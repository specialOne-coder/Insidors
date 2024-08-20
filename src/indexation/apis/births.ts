import { getBlockscoutApiUrl } from "@utils/index";


export const getTokenBirthTime = async (network: string, address: string,) => {
    const [addressUrl, transactionUrl] = getBlockscoutApiUrl(network, address);
    const addressInfo = await fetch(`${addressUrl + address}`);
    let infos = await addressInfo.json();
    const creationTransactionHash = infos.creation_tx_hash;
    const txInfo = await fetch(`${transactionUrl + creationTransactionHash}`);
    let transactionInfos = await txInfo.json();
    const birthTime = Math.floor(new Date(transactionInfos.timestamp).getTime() / 1000);
    return birthTime;
}


export async function getSolanaTokenBirth(tokenAddress: string) {
    const url = 'https://rest-api.hellomoon.io/v0/defi/token-age';
    const headers = {
        'Accept': 'application/json',
        'Authorization': 'Bearer db078dd1-b699-4870-8e39-a70af38e4c9e',
        'Content-Type': 'application/json'
    };

    const body = JSON.stringify({
        "mint": tokenAddress
    });

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: body
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const currentUnixTime = Math.floor(Date.now() / 1000); // Get current Unix time in seconds
        const creationUnixTimestamp = currentUnixTime - data.age; // Subtract age from current time
        return creationUnixTimestamp;
    } catch (error) {
        console.error('Error fetching token age:', error);
    }
}
