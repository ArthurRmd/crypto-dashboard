import axios from "axios";
import {RegisterDo, RegisterPayloadDo, UpdateUserDo} from "../models/do/register";
import {LoginDo, LoginPayloadDo} from "../models/do/login";
import {BEARER, SERVER_LOGIN_ROUTE, SERVER_REGISTER_ROUTE, SERVER_USER_UPDATE_ROUTE} from "./api_routes";

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
                    return Promise.resolve(response.data);
                }

                throw new Error('Failed to login with' + payload.email);
            })
            .catch((error) => {
                console.log(error);
                throw new Error('Failed to contact server. Please refresh your client.');
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
            })
            .catch((error) => {
                console.log(error);
                throw new Error('Failed to contact server. Please refresh your client.');
            });
    }

    public async update(token: string, updatedUser: UpdateUserDo): Promise<string> {
        return axios.patch<string>(
            SERVER_USER_UPDATE_ROUTE,
            updatedUser,
            {headers: {'Authorization': BEARER + token,}}
        )
            .then((response) => {
                const status = response.status;
                if (status === 200) {
                    return Promise.resolve(response.data);
                }
                throw new Error('Failed to update user');
            })
            .catch((error) => {
                console.log(error);
                throw new Error('Failed to contact server. Please refresh your client.');
            });
    }


    private constructor() {
    }

}
