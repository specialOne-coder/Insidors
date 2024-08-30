import { MOBULA_KEY } from "@configs/index";
import { getBlockscoutApiUrl } from "@utils/index";
import { Pair } from "src/types";


const headers = {
    'Accept': 'application/json',
    'Authorization': `${MOBULA_KEY}`,
    'Content-Type': 'application/json'
};

export const getEvmTokenPairs = async (network: string, address: string): Promise<Pair[]> => {
    const tokenPairs = await fetch(`https://api.mobula.io/api/1/market/pairs?asset=${address}`, {
        method: 'GET',
        headers: headers,
    });
    let jsonPairs = await tokenPairs.json();
    return jsonPairs.data.pairs.map((pair: any) => {
        return { address: pair.address, liquidity: pair.liquidity }
    });
}

const getPairTransferCount = async (url: string): Promise<number> => {
    const adrTxCounts = await fetch(url);
    let infos = await adrTxCounts.json();
    let count = infos.token_transfers_count;
    return count;
}

export const getEvmTokenTrades = async (pairs: Pair[], network: string) => {
    console.log("The pair,", pairs[0]);
    // pairs.forEach(async (pair) => {
    const [, , counterUrl] = getBlockscoutApiUrl(network, pairs[0].address);
    const count = await getPairTransferCount(counterUrl);
    console.log("The count,", count);
    
    const tokenTrades = await fetch(`https://api.mobula.io/api/1/market/trades/pair?amount=100000&address=${pairs[0].address}`, {
        method: 'GET',
        headers: headers,
    });
    console.log("The trades,", tokenTrades);

    let jsonTrades = await tokenTrades.json();
    console.log("Trades length: ", jsonTrades.data.length);

    // console.log({ jsonTrades });
    // });
    return 'ok';

}