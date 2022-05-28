export interface InvestmentDo {
    success: boolean;
    data: InvestmentDataDo[];
}

export interface SingleInvestmentDo {
    success: boolean;
    data: InvestmentDataDo;
}

export interface InvestmentDataDo {
    price_usd: number;
    crypto_value: number;
    created_at: string;
    crypto: CryptoDo;
}

export interface CryptoDo {
    id: number;
    name: string;
    symbol: string;
    price_usd: number;
    price_forex: number;
    change_percent_24h: number;
    updated_at: string;
}

export interface BuyCryptoPayloadDo {
    price_usd: number;
}
