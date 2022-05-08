import axios from "axios";
import {RegisterDo, RegisterPayloadDo} from "../models/do/register";
import {LoginDo, LoginPayloadDo} from "../models/do/login";
import {LOGIN_ROUTE, REGISTER_ROUTE} from "./api_routes";

export class UserService {

    public static create(): UserService {
        return new UserService();
    }

    public async login(payload: LoginPayloadDo): Promise<LoginDo> {
        console.log('Try to login with ', payload);
        return axios.post<LoginDo>(LOGIN_ROUTE, payload)
            .then((response) => {
                const status = response.status;
                if (status === 200) {
                    return Promise.resolve(response.data);
                }

                throw new Error('Failed to login with' + payload.getEmail());
            })
            .catch((error) => {
                console.log(error);
                throw new Error('Failed to contact server. Please refresh your client.');
            });
    }

    public async register(payload: RegisterPayloadDo): Promise<RegisterDo> {
        return axios.post<RegisterDo>(REGISTER_ROUTE, payload)
            .then((response) => {
                const status = response.status;
                if (status === 201) {
                    return response.data;
                }

                throw new Error('Failed to register new user. Please give correct information');
            })
            .catch((error) => {
                console.log(error);
                throw new Error('Failed to contact server. Please refresh your client.');
            });
    }

    private constructor() {
    }

}
