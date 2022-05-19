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