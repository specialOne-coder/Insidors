import { saveDataToJsonFile } from "@utils/index";
import { BirdeyePriceHistory, Pair } from "src/types";
import { getEvmTokenBirth, getSolanaTokenBirth } from "./births";
import { getEvmTokenPairs, getEvmTokenTrades } from "./trades";
import { BIRDEYE_KEY } from "@configs/index";


/**
 * Get the historical prices of a token
 * @param tokenName the name of the token
 * @param chain the chain of the token
 * @param address the address of the token
 * @param address_type the type of the address
 * @param time_from the time from which to get the historical prices
 * @returns the historical prices of the token
 */
async function getTokenHistoricalPrices(tokenName: string, chain: string, address: string, address_type: string, time_from: string) {
    const type = '1m';
    let allData: BirdeyePriceHistory[] = [];
    let current_time_from = time_from;
    const timestampInMilliseconds = Date.now();
    const time_to = Math.floor(timestampInMilliseconds / 1000).toString();

    console.log({ current_time_from });
    console.log({ time_to });

    while (current_time_from < time_to) {
        const url = `https://public-api.birdeye.so/defi/history_price?address=${address}&address_type=${address_type}&type=${type}&time_from=${current_time_from}&time_to=${time_to}`;
        console.log({ url });

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'x-api-key': BIRDEYE_KEY,
                'x-chain': chain == 'eth' ? 'ethereum' : chain
            }
        });
        const result = await response.json();
        console.log('Result length', result.data.items.length);
        // Vérifier si la réponse est un succès
        if (!result.success || !result.data || !result.data.items.length) {
            console.error('Error while fetching data', result);
            break;
        }
        const items = result.data.items;
        const lastTimestamp = items[items.length - 1].unixTime;
        allData = allData.concat(items);
        if (lastTimestamp >= time_to) {
            console.log('All data fetched');
            break;
        }
        // Mettre à jour le time_from pour la prochaine requête
        current_time_from = lastTimestamp + 1;
    }
    saveDataToJsonFile(allData, tokenName, "prices");
    return allData;
}


async function getTokenHistoricalTrades(tokenName: string, chain: string, address: string, address_type: string, time_from: string) {
    let pairinhistoric: Pair[] = await getEvmTokenPairs(chain, address);
    await getEvmTokenTrades(pairinhistoric, chain);
}

/**
 * Index all necessary datas for a given chain and token
 * @param chainAndToken the chain and token to index
 */
export async function indexAll(chainAndToken: string) {
    // Split chain and token
    const [chain, token] = chainAndToken.split(":");
    // Index prices
    // const info = chain == "solana" ? await getSolanaTokenBirth(token) : await getEvmTokenBirth(chain, token);
    // await getTokenHistoricalPrices(info.name, chain, token, 'token', info.birth.toFixed(0).toString());

    // Index trades
    await getTokenHistoricalTrades(token, chain, token, 'token', '0');
}