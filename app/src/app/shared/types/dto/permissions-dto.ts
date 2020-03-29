import { BaseRequest } from "../base-request";

export type PermissionsDTO = BaseRequest<Permissions>;

type Permissions = {
    permissionId: number;
    permission: string;
};
