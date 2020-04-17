import { BaseRequest } from "../base-request";

export type UserTypeDTO = BaseRequest<UserType>;

export type UserType = {
    userTypeId: number;
    type: string;
};
