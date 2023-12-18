export class AppUserDTO {
    constructor(private id: number, private userName: string, private token: string) { }

    public getId(): number {
        return this.id;
    }

    public getUserName(): string {
        return this.userName;
    }

    public getToken(): string {
        return this.token;
    }
}
