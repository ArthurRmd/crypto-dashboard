export class RegisterDo {
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

export class ResponseRegisterDo {
  private success: boolean;
  private data: RegisterDataDo;

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
  private name: string;
  private email: string;
  private id: number;

  public constructor(name: string, email: string, id: number) {
    this.name = name;
    this.email = email;
    this.id = id;
  }

  public getName(): string {
    return this.name;
  }

  public getEmail(): string {
    return this.email;
  }

  public getId(): number {
    return this.id;
  }
}
