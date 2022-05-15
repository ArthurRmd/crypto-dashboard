export class InvestmentDo {
    private _success: boolean;
    private _data: InvestmentDataDo[];

    public constructor(success: boolean, data: InvestmentDataDo[]) {
        this._success = success;
        this._data = data;
    }

    get success(): boolean {
        return this._success;
    }

    get data(): InvestmentDataDo[] {
        return this._data;
    }
}

export class InvestmentDataDo {
    private _priceUsd: number;
    private _cryptoValue: number;
    private _createdAt: Date;
    private _crypto: CryptoDo;

    constructor(price_usd: number, crypto_value: number, created_at: Date, crypto: CryptoDo) {
        this._priceUsd = price_usd;
        this._cryptoValue = crypto_value;
        this._createdAt = created_at;
        this._crypto = crypto;
    }

    get priceUsd(): number {
        return this._priceUsd;
    }

    get cryptoValue(): number {
        return this._cryptoValue;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    get crypto(): CryptoDo {
        return this._crypto;
    }
}

export class CryptoDo {
    private _id: number;
    private _name: string;
    private _symbol: string;
    private _priceUsd: number;
    private _changePercent24h: number;
    private _updatedAt: Date;

    constructor(id: number, name: string, symbol: string, price_usd: number, change_percent_24h: number, update_at: Date) {
        this._id = id;
        this._name = name;
        this._symbol = symbol;
        this._priceUsd = price_usd;
        this._changePercent24h = change_percent_24h;
        this._updatedAt = update_at;
    }

    get id(): number {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get symbol(): string {
        return this._symbol;
    }

    get priceUsd(): number {
        return this._priceUsd;
    }

    get changePercent24h(): number {
        return this._changePercent24h;
    }

    get updatedAt(): Date {
        return this._updatedAt;
    }
}
