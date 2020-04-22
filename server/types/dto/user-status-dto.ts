import { BaseRequest } from '../base-request';

export type UserStatusDTO = BaseRequest<UserStatusEnum>;

export type UserStatusEnum = {
    userStatusId: number;
    status: string;
};
