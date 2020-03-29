import { BaseRequest } from "../base-request";

export type UserTypeDTO = BaseRequest<UserType>;

type UserType = {
    userTypeId: number;
    type: string;
};
