export class RegisterPayloadDo {
    private name: string;
    private email: string;
    private password: string;

    public constructor(name: string, email: string, password: string) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    public getName(): string {
        return this.name;
    }

    public getEmail(): string {
        return this.email;
    }

    public getPassword(): string {
        return this.password;
    }
}

export class RegisterDo {
    private success: boolean;
    private data: RegisterDataDo;

    public static empty() {
        return new RegisterDo(false, new RegisterDataDo('', '', -1));
    }

    public constructor(success: boolean, data: RegisterDataDo) {
        this.success = success;
        this.data = data;
    }

    public isSuccessful(): boolean {
        return this.success;
    }

    public getData(): RegisterDataDo {
        return this.data;
    }
}

export class RegisterDataDo {
    private _name: string;
    private _email: string;
    private _id: number;

    public constructor(name: string, email: string, id: number) {
        this._name = name;
        this._email = email;
        this._id = id;
    }

    get name(): string {
        return this._name;
    }

    get email(): string {
        return this._email;
    }

    get id(): number {
        return this._id;
    }
}
