import { BaseRequest } from '../base-request';

export type PermissionsDTO = BaseRequest<Permissions>;

export type Permissions = {
    permissionId: number;
    permission: string;
};
