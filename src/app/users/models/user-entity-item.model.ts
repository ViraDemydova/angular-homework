export interface UserEntityItem {
  id: number;
  firstName: string;
  lastName: string;
}

export class UserModel implements UserEntityItem {
  constructor(public id: number,
              public firstName: string,
              public lastName: string) {}
}

