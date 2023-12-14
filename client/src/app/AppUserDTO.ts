export interface IAppUser {
    id: number;
    userName: string;
}

export class AppUserDTO {
    constructor(private id: number, private userName: string) { }

    public getId(): number {
        return this.id;
    }

    public getUserName(): string {
        return this.userName;
    }
}
