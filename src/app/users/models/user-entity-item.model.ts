export interface UserEntityItem {
  id: number;
  firstName: string;
  lastName: string;
  login: string;
  password: string;
  tokenKey?: string;
}

export class UserModel implements UserEntityItem {
  constructor(public id: number,
              public firstName: string,
              public lastName: string,
              public login: string,
              public password: string,
              public tokenKey?: string) {}
}

