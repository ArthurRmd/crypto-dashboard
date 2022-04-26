export class DashBoardCryptDo {

  private currencyName: string;
  private gainLast24Hours: number;
  private totalWallet: number;
  private totalWalletDifference: number;

  public constructor(
    currencyName: string,
    gainLast24Hours: number,
    totalWallet: number,
    totalWalletDifference: number
  ) {
    this.currencyName = currencyName;
    this.gainLast24Hours = gainLast24Hours;
    this.totalWallet = totalWallet;
    this.totalWalletDifference = totalWalletDifference;
  }

  public getCurrencyName(): string {
    return this.currencyName;
  }

  public getGainLast24Hours(): number {
    return this.gainLast24Hours;
  }

  public getTotalWallet(): number {
    return this.totalWallet;
  }

  public getTotalWalletDifference(): number {
    return this.totalWalletDifference;
  }

}
