import { HELLO_MOON_KEY } from "@configs/index";
import { getBlockscoutApiUrl } from "@utils/index";
import { TokenInfo } from "src/types";


export const getEvmTokenBirth = async (network: string, address: string): Promise<TokenInfo> => {
    const [addressUrl, transactionUrl, _] = getBlockscoutApiUrl(network, address);
    const addressInfo = await fetch(`${addressUrl + address}`);
    let infos = await addressInfo.json();
    const creationTransactionHash = infos.creation_tx_hash;
    const tokenName = infos.token.name;
    const txInfo = await fetch(`${transactionUrl + creationTransactionHash}`);
    let transactionInfos = await txInfo.json();
    const birthTime = Math.floor(new Date(transactionInfos.timestamp).getTime() / 1000);
    return { name: tokenName, birth: birthTime };
}


export async function getSolanaTokenBirth(tokenAddress: string): Promise<TokenInfo> {
    const ageUrl = 'https://rest-api.hellomoon.io/v0/defi/token-age';
    const infoUrl = 'https://rest-api.hellomoon.io/v0/defi/fungible-token-info';

    const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${HELLO_MOON_KEY}`,
        'Content-Type': 'application/json'
    };

    const body = JSON.stringify({
        "mint": tokenAddress
    });
    const tokenAge = await fetch(ageUrl, {
        method: 'POST',
        headers: headers,
        body: body
    });
    const tokenInfo = await fetch(infoUrl, {
        method: 'POST',
        headers: headers,
        body: body
    });
    if (!tokenAge.ok || !tokenInfo.ok) {
        throw new Error(`HTTP error! status: age ${tokenAge.status} and info ${tokenInfo.status}`);
    }
    const ageData = await tokenAge.json();
    const infoData = await tokenInfo.json();

    const currentUnixTime = Math.floor(Date.now() / 1000); // Get current Unix time in seconds
    const creationUnixTimestamp = currentUnixTime - ageData.age; // Subtract age from current time
    return { name: infoData.data[0].name, birth: creationUnixTimestamp };
}
