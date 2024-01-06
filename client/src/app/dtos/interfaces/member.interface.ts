import { IBaseUser } from "./app-user.interface";
import { IPhoto } from "./photo.interface";

export interface IMember extends IBaseUser {
    photoUrl: string;
    age: number;
    knownAs: string;
    created: Date;
    lastActive: Date;
    gender: string;
    introduction: string;
    lookingFor: string;
    interests: string;
    city: string;
    country: string;
    photos: IPhoto[];
}