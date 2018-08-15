export interface UserEntityItem {
  id?: number;
  login?: string;
  password?: string;
  token?: string;
}

export class UserModel implements UserEntityItem {
  constructor(public id?: number,
              public login?: string,
              public password?: string,
              public token?: string) {}
}

