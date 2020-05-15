import * as dbUsers from '../../modules/db-modules/db-users'; 
import { sendUnexpectedError, sendError, sendErrorInvalidPermissions } from '../../modules/error-handler';
import { RequestTypesEnum } from '../../types/enums/request-type.enum';
import { UserDTO } from '../../types/dto/user-dto';
import { checkUser } from '../../modules/security-modules/check-user';
import { checkPermissions } from '../../modules/security-modules/permissions-check';
import { PermissionsEnum } from '../../types/enums/permissions.enum';
import { isUserLoginUnic } from '../../modules/validation-modules/validate-existent';
import { CLIENT_LOGIN_NOT_UNIC } from '../../constants/errors';

export async function action(type: RequestTypesEnum, req: any, res: any) {
    if (type === RequestTypesEnum.post) {
        try {
            const error = await checkUser(req.body.userId, req.body.userToken);
            if (error) {
                req.body.error = error;
                sendError(type, req, res);
                return;
            }

            const isPermitted = await checkPermissions(req.body.userId, [PermissionsEnum.AddUser]);
            if (!isPermitted) {
                sendErrorInvalidPermissions(type, req, res);
                return;
            }

            if (!isUserLoginUnic(req.body.data.login)) {
                req.body.error = {
                    errCode: '0',
                    errMsg: CLIENT_LOGIN_NOT_UNIC,
                    errTip: null
                };
                sendError(type, req, res);
                return;
            }

            const newUser = await dbUsers.userRegister(
                req.body.userId,
                req.body.data
            );

            const responce: UserDTO = {
                type,
                userId: req.body.userId,
                userToken: req.body.userToken,
                data: newUser,
                error: null
            };

            res.send(responce);
        }
        catch(err) {
            sendUnexpectedError(type, req, res);
        }
    }
}
