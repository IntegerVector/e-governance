import { BaseRequest } from "../base-request";

export type UserTypePermissionsDTO = BaseRequest<UserTypePermissions>;

export type UserTypePermissions = {
    id: number;
    userTypeId: number;
    permissionId: number;
};
