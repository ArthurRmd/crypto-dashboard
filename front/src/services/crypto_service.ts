import {DashBoardCryptDo} from "../models/do/dashboard_crypto";
import axios from "axios";
import {SERVER_FETCH_NEW_CHANGES} from "./api_routes";

export class CryptoService {

    public static create(): CryptoService {
        return new CryptoService();
    }

    private constructor() {
    }

    public async fetchNewChanges(): Promise<DashBoardCryptDo[]> {
        return Promise.resolve(CryptoService.fakeData());
        // return await axios.get<DashBoardCryptDo[]>(FETCH_NEW_CHANGES)
        // .then((response) => {
        // const status = response.status;
        // if (status === 200) {
        // return response.data;
        // }
// 
        // throw new Error('Failed to fetch new changes for dashboard on ' + FETCH_NEW_CHANGES + ' with status ' + status);
        // }).catch((error) => {
        // throw new Error('Failed to fetch new changes for dashboard on ' + FETCH_NEW_CHANGES, error);
        // });
    }

    private static fakeData(): DashBoardCryptDo[] {
        return [
            {currencyName: 'BTC', gainLast24Hours: 1.05, totalWallet: 870.17, totalWalletDifference: 256.98},
            {currencyName: 'ETH', gainLast24Hours: 5.35, totalWallet: 1050.45, totalWalletDifference: 190.11},
        ];
    }
}
