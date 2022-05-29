import { BuyCryptoPayloadDo, InvestmentDataDo, InvestmentDo, SingleInvestmentDo } from "../models/do/investment";
import axios from "axios";
import { BEARER, SERVER_INVESTMENT_BUY_ROUTE, SERVER_INVESTMENTS_ROUTE, SERVER_INVESTMENT_DELETE_ROUTE } from "./api_routes";

export class InvestmentsService {

  public static create(): InvestmentsService {
    return new InvestmentsService();
  }

  public async deleteInvestment(token: string, investment: number): Promise<string> {
    return axios.delete(
      SERVER_INVESTMENT_DELETE_ROUTE.replace('{crypto}', String(investment)),
      { headers: { 'Authorization': BEARER + token, } }
    )
      .then(response => {
        if (response.status === 200) {
          return 'Success deleting';
        }
        return Promise.reject('Failed to delete');
      });
  }

  public async buyCrypto(token: string, payload: BuyCryptoPayloadDo, crypto_id: string): Promise<InvestmentDataDo> {
    return axios.post<SingleInvestmentDo>(
      SERVER_INVESTMENT_BUY_ROUTE.replace('{crypto}', crypto_id),
      payload,
      { headers: { 'Authorization': BEARER + token, } }
    )
      .then(response => {
        const status = response.status;
        if (201 === status) {
          return response.data.data;
        }
        return Promise.reject("Failed to fetch investments with status " + status);
      });
  }

  public async fetchInvestments(token: string):
    Promise<InvestmentDo> {
    return axios.get<InvestmentDo>(SERVER_INVESTMENTS_ROUTE, { headers: { 'Authorization': BEARER + token, } })
      .then(response => {
        const status = response.status;
        if (200 === status) {
          return response.data;
        }
        return Promise.reject("Failed to fetch investments with status " + status);
      });
  }

  private constructor() {
  }

}
