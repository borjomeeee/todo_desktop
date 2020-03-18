export interface IUser {
  _id: string;
  token: string;
  name: string;
  email: string;
  plans: string[];
  isAuth: boolean;
}

export class User implements IUser {
  _id: string;
  token: string;
  name: string;
  email: string;
  plans: string[];
  isAuth: boolean;

  constructor(
    user: IUser = {
      _id: "",
      token: "",
      name: "",
      email: "",
      plans: [],
      isAuth: false
    }
  ) {
    this._id = user._id;
    this.token = user.token;
    this.name = user.name;
    this.email = user.email;
    this.plans = user.plans;

    this.isAuth = user.isAuth;

    return this;
  }

  // METHODS
  public login() {
    this.isAuth = true;
  }

  public logout() {
    this.isAuth = false;
  }
}

export type UserType = typeof User;
