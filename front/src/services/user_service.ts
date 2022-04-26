import { RegisterDataDo, RegisterDo, ResponseRegisterDo } from "../models/do/register";

export class UserService {

  public static create(): UserService {
    return new UserService();
  }

  public register(register: RegisterDo): ResponseRegisterDo {
    return new ResponseRegisterDo(
      true,
      new RegisterDataDo(
        register.getName(),
        register.getEmail(),
        1
      )
    );
  }

  private constructor() { }

}
