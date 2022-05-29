import axios from "axios";
import { RegisterDo, RegisterPayloadDo, UpdateUserDo } from "../models/do/register";
import { LoginDo, LoginPayloadDo } from "../models/do/login";
import { BEARER, SERVER_LOGIN_ROUTE, SERVER_REGISTER_ROUTE, SERVER_USER_UPDATE_ROUTE } from "./api_routes";

export class UserService {

  public static create(): UserService {
    return new UserService();
  }

  public async login(payload: LoginPayloadDo): Promise<LoginDo> {
    console.log('Try to login with ', payload);
    return axios.post<LoginDo>(SERVER_LOGIN_ROUTE, payload)
      .then((response) => {
        const status = response.status;
        if (status === 200) {
          return response.data;
        }
        if (status === 401) {
          return Promise.reject("Bad credentials !");
        }
        return Promise.reject(response.headers['Crypto-Dashboard-Error']);
      });
  }

  public async register(payload: RegisterPayloadDo): Promise<RegisterDo> {
    return axios.post<RegisterDo>(SERVER_REGISTER_ROUTE, payload)
      .then((response) => {
        const status = response.status;
        if (status === 201) {
          return response.data;
        }

        throw new Error('Failed to register new user. Please give correct information');
      });
  }

  public async update(token: string, updatedUser: UpdateUserDo): Promise<string> {
    return axios.patch<string>(
      SERVER_USER_UPDATE_ROUTE,
      updatedUser,
      { headers: { 'Authorization': BEARER + token, } }
    )
      .then((response) => {
        const status = response.status;
        if (status === 200) {
          return response.data;
        }
        throw new Error('Failed to update user');
      });
  }


  private constructor() {
  }

}
