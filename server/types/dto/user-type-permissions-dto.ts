import { BaseRequest } from "../base-request";

export type UserTypePermissionsDTO = BaseRequest<UserTypePermissions>;

type UserTypePermissions = {
    id: number;
    userTypeId: number;
    permissionId: number;
};
