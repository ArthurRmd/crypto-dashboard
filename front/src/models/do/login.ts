export interface LoginDo {
    success: boolean;
    data: LoginDataDo;
}

export interface LoginDataDo {
    token: string;
    user: LoginUserDo;
}

export interface LoginUserDo {
    id: number;
    name: string;
    email: string;
    lang: string;
    forex: string;
}

export interface LoginPayloadDo {
    email: string;
    password: string;
}


