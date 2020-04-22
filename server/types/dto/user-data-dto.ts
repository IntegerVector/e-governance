import { BaseRequest } from '../base-request';

export type UserDataDTO = BaseRequest<UserData>;

export type UserData = {
    userDataId: number;
    login: string;
    pass: string;
    profilePicturePath: string;
    userDocumentsId: number;
    // ToDo: Will be extended!
};
