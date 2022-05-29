import {DashBoardCryptDataDo, DashBoardCryptDo, DashBoardCryptStatDataDo} from "../models/do/dashboard_crypto";
import axios from "axios";
import {BEARER, SERVER_FETCH_NEW_CHANGES, SERVER_STATISTICS_DASHBOARD} from "./api_routes";

export class CryptoService {

    public static create(): CryptoService {
        return new CryptoService();
    }

    private constructor() {
    }

    public async fetchNewChanges(token: string): Promise<DashBoardCryptDataDo[]> {
        return await axios.get<DashBoardCryptDo>(
            SERVER_FETCH_NEW_CHANGES,
            {headers: {'Authorization': BEARER + token,}}
        )
            .then((response) => {
                const status = response.status;
                if (status === 200) {
                    return response.data.data;
                }

                throw new Error('Failed to fetch new changes for dashboard on ' + SERVER_FETCH_NEW_CHANGES + ' with status ' + status);
            }).catch((error) => {
                throw new Error('Failed to fetch new changes for dashboard on ' + SERVER_FETCH_NEW_CHANGES, error);
            });
    }


    public async getStatistics(token: string): Promise<DashBoardCryptStatDataDo> {

        return await axios.get<DashBoardCryptStatDataDo>(
            SERVER_STATISTICS_DASHBOARD,
            {headers: {'Authorization': BEARER + token,}}
        )
            .then((response) => {
                const status = response.status;
                if (status === 200) {
                    return response.data;
                }

                throw new Error('Failed to fetch new changes for dashboard on ' + SERVER_FETCH_NEW_CHANGES + ' with status ' + status);
            }).catch((error) => {
                throw new Error('Failed to fetch new changes for dashboard on ' + SERVER_FETCH_NEW_CHANGES, error);
            });
    }
}
