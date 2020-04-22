import { BaseRequest } from '../base-request';

export type PermissionsDTO = BaseRequest<PermissionsEnum>;

export type PermissionsEnum = {
    permissionId: number;
    permission: string;
};
