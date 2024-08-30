

export type BirdeyePriceHistory = {
    address: string;
    unixTime: number;
    value: number;
}

export type TokenInfo = {
    name: string;
    birth: number;
}

export type Pair = {
    address: string;
    liquidity: number;
}

export type Trades = {
    trader: string;
    timestamp: number;
    amount: number;
    type: string;
}