import { BaseRequest } from "../base-request";

export type UserDataDTO = BaseRequest<UserData>;

export type UserData = {
    userDataId: number;
    login: string;
    pass: string;
    // ToDo: Will be extended!
};
