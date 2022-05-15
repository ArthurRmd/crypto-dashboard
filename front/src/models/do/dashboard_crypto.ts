export class DashBoardCryptDo {

    private _currencyName: string;
    private _gainLast24Hours: number;
    private _totalWallet: number;
    private _totalWalletDifference: number;

    public constructor(
        currencyName: string,
        gainLast24Hours: number,
        totalWallet: number,
        totalWalletDifference: number
    ) {
        this._currencyName = currencyName;
        this._gainLast24Hours = gainLast24Hours;
        this._totalWallet = totalWallet;
        this._totalWalletDifference = totalWalletDifference;
    }

    get currencyName(): string {
        return this._currencyName;
    }

    get gainLast24Hours(): number {
        return this._gainLast24Hours;
    }

    get totalWallet(): number {
        return this._totalWallet;
    }

    get totalWalletDifference(): number {
        return this._totalWalletDifference;
    }
}
