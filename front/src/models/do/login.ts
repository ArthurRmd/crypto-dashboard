export class LoginDo {
    private _success: boolean;
    private _data: LoginDataDo;

    public constructor(success: boolean, data: LoginDataDo) {
        this._success = success;
        this._data = data;
    }

    get success(): boolean {
        return this._success;
    }

    get data(): LoginDataDo {
        return this._data;
    }
}

export class LoginDataDo {
    private _name: string;
    private _email: string;
    private _token: string;

    public constructor(name: string, email: string, token: string) {
        this._name = name;
        this._email = email;
        this._token = token;
    }

    get name(): string {
        return this._name;
    }

    get email(): string {
        return this._email;
    }

    get token(): string {
        return this._token;
    }
}

export class LoginPayloadDo {
    private email: string;
    private password: string;

    public constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }

    public getEmail(): string {
        return this.email;
    }

    public getPassword(): string {
        return this.password;
    }
}


