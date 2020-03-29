import { BaseRequest } from '../base-request';

export type UserDTO = BaseRequest<User>;

type User = {
    userId?: number;
    userToken?: number;
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
    sys_AddedDate: Date;
    sys_UpdatedDate: Date;
    sys_DeletedDate: Date;
    validFrom: Date;
    validTo: Date;
    documentDataId: number;
};
