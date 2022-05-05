export class LoginDo {

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


