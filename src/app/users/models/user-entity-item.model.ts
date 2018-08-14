export interface UserEntityItem {
  id?: number;
  login?: string;
  password?: string;
  tokenKey?: string;
}

export class UserModel implements UserEntityItem {
  constructor(public id?: number,
              public login?: string,
              public password?: string,
              public tokenKey?: string) {}
}

