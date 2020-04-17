import { BaseRequest } from "../base-request";

export type UserStatusDTO = BaseRequest<UserStatus>;

export type UserStatus = {
    userStatusId: number;
    status: string;
};
