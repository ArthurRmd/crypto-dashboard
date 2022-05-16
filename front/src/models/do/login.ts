export interface LoginDo {
    success: boolean;
    data: LoginDataDo;
}

export interface LoginDataDo {
    name: string;
    email: string;
    token: string;
}

export interface LoginPayloadDo {
    email: string;
    password: string;
}


