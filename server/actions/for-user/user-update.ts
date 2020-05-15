import * as dbUsers from '../../modules/db-modules/db-users'; 
import { sendUnexpectedError, sendError, sendErrorInvalidPermissions } from '../../modules/error-handler';
import { UserDTO } from '../../types/dto/user-dto';
import { RequestTypesEnum } from '../../types/enums/request-type.enum';
import { checkUser } from '../../modules/security-modules/check-user';
import { checkPermissions } from '../../modules/security-modules/permissions-check';
import { PermissionsEnum } from '../../types/enums/permissions.enum';
import { checkIfUserDeleted } from '../../modules/validation-modules/validate-deleted';
import { CLIENT_USER_DELETED, CLIENT_USER_DELETED_TIP } from '../../constants/errors';

export async function action(type: RequestTypesEnum, req: any, res: any) {
    if (type === RequestTypesEnum.post) {
        try {
            const error = await checkUser(req.body.userId, req.body.userToken);
            if (error) {
                req.body.error = error;
                sendError(type, req, res);
                return;
            }

            if (req.body.userId != req.body.data.userId) {
                const isPermitted = await checkPermissions(req.body.userId, [PermissionsEnum.UpdateUser]);
                if (!isPermitted) {
                    sendErrorInvalidPermissions(type, req, res);
                    return;
                }
            } else {
                const isPermitted = await checkPermissions(req.body.userId, [PermissionsEnum.UpdateYourself]);
                if (!isPermitted) {
                    sendErrorInvalidPermissions(type, req, res);
                    return;
                }
            }

            const isDeleted = await checkIfUserDeleted(req.body.data.userId);
            if (isDeleted) {
                req.body.error = {
                    errCode: '0',
                    errMsg: CLIENT_USER_DELETED,
                    errTip: CLIENT_USER_DELETED_TIP
                };
                sendError(type, req, res);
                return;
            }

            const updatedUser = await dbUsers.userUpdate(
                req.body.userId,
                req.body.data
            );

            const responce: UserDTO = {
                type,
                userId: req.body.userId,
                userToken: req.body.userToken,
                data: updatedUser,
                error: null
            };

            res.send(responce);
        }
        catch(err) {
            sendUnexpectedError(type, req, res);
        }
    }
}
