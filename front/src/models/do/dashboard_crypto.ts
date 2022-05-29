export interface DashBoardCryptDo {
    success: boolean;
    data: DashBoardCryptDataDo[];
}

export interface DashBoardCryptDataDo {
    name: string;
    symbol: string;
    price_usd: number;
    change_percent_24h: number;
}

export interface DashBoardCryptStatDataDo {
    months: string[];
    data: CryptoDataDo[];
}

export interface CryptoDataDo {
    name: string;
    color: string;
    values: number[];
}

export interface CryptoDatasetDo {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
}

