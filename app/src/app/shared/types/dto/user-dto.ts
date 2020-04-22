import { BaseRequest } from '../base-request';

export type UserDTO = BaseRequest<User>;

export type User = {
    userId?: number;
    userToken?: string;
    userFirstName: string;
    userLastName: string;
    userPatronymic: string;
    userPhoneNumber: string;
    userSPhoneNumber: string;
    userEmail: string;
    userSEmail: string;
    userBirthDate: string;
    userTypeId: number;
    userStatusId: number;
    sys_AddedBy: number;
    sys_UpdatedBy: number;
    sys_DeletedBy: number;
    sys_AddedDate: string;
    sys_UpdatedDate: string;
    sys_DeletedDate: string;
    validFrom: string;
    validTo: string;
    userDataId: number;
};
