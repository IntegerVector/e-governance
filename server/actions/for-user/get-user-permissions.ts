import * as dbUsers from '../../modules/db-modules/db-users'; 
import { RequestTypesEnum } from '../../types/enums/request-type.enum';
import { PermissionsEnum } from '../../types/enums/permissions.enum';
import { BaseRequest } from '../../types/base-request';
import { checkUser } from '../../modules/security-modules/check-user';
import { checkIfUserDeleted } from '../../modules/validation-modules/validate-deleted';
import { CLIENT_USER_DELETED, CLIENT_USER_DELETED_TIP } from '../../constants/errors';
import { sendError, sendUnexpectedError } from '../../modules/validation-modules/error-handler';

export async function action(type: RequestTypesEnum, req: any, res: any) {
    if (type === RequestTypesEnum.get) {
        try {
            const error = await checkUser(req.body.userId, req.body.userToken);
            if (error) {
                req.body.error = error;
                sendError(type, req, res);
                return;
            }

            const permissions = await dbUsers.getUserPermissions(req.body.userId);
            const responce: BaseRequest<{ permissions: PermissionsEnum[] }> = {
                userId: req.body.userId,
                userToken: req.body.userToken,
                type: type,
                data: {
                    permissions,
                },
                error: null
            };

            res.send(responce);
        }
        catch(err) {
            sendUnexpectedError(type, req, res);
        }
    }
}
