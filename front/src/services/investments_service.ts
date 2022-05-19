import {BuyCryptoPayloadDo, InvestmentDataDo, InvestmentDo, SingleInvestmentDo} from "../models/do/investment";
import axios from "axios";
import {SERVER_INVESTMENT_BUY_ROUTE, SERVER_INVESTMENTS_ROUTE} from "./api_routes";

const BEARER = 'Bearer ';

export class InvestmentsService {

    public static create(): InvestmentsService {
        return new InvestmentsService();
    }

    public buyCrypto(token: string, payload: BuyCryptoPayloadDo, crypto_id: string): Promise<InvestmentDataDo> {
        return axios.post<SingleInvestmentDo>(
            SERVER_INVESTMENT_BUY_ROUTE.replace('{crypto}', crypto_id),
            payload,
            {headers: {'Authorization': BEARER + token,}}
        )
            .then(response => {
                const status = response.status;
                if (201 === status) {
                    return response.data.data;
                }
                throw new Error("Failed to fetch investments with status " + status);
            })
            .catch(error => {
                console.log(error);
                throw new Error('Failed to contact server. Please refresh your client.');
            });
    }

    public fetchInvestments(token: string):
        Promise<InvestmentDo> {
        return axios.get<InvestmentDo>(SERVER_INVESTMENTS_ROUTE, {headers: {'Authorization': BEARER + token,}})
            .then(response => {
                const status = response.status;
                if (200 === status) {
                    return response.data;
                }
                throw new Error("Failed to fetch investments with status " + status);
            })
            .catch((error) => {
                console.log(error);
                throw new Error('Failed to contact server. Please refresh your client.');
            });
    }

    private constructor() {
    }

}