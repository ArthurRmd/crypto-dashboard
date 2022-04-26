import { RegisterDataDo, RegisterDo, ResponseRegisterDo } from "../models/do/register";

export class UserService {

  public static create(): UserService {
    return new UserService();
  }

  public async register(register: RegisterDo): Promise<ResponseRegisterDo> {
    return Promise.resolve(
      new ResponseRegisterDo(
        true,
        new RegisterDataDo(
          register.getName(),
          register.getEmail(),
          1
        )
      )
    );
  }

  private constructor() { }

}
