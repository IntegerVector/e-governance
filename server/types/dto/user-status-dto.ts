import { BaseRequest } from "../base-request";

export type UserStatusDTO = BaseRequest<UserStatus>;

type UserStatus = {
    userStatusId: number;
    status: string;
};
