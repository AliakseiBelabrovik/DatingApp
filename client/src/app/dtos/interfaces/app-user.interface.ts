export interface IBaseUser {
    id: number;
    userName: string;
}

export interface IAppUser extends IBaseUser {
    token: string;
}
