import {InvestmentDo} from "../models/do/investment";
import axios from "axios";
import {SERVER_INVESTMENTS_ROUTE} from "./api_routes";

const BEARER = 'Bearer ';

export class InvestmentsService {

    public static create(): InvestmentsService {
        return new InvestmentsService();
    }

    public fetchInvestments(token: string): Promise<InvestmentDo> {
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