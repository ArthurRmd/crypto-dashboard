export interface RegisterPayloadDo {
    name: string;
    email: string;
    password: string;
}

export interface RegisterDo {
    success: boolean;
    data: RegisterDataDo;
}

export interface RegisterDataDo {
    name: string;
    email: string;
    id: number;
}

export interface UpdateUserDo {
    password: string;
}
