import * as dbUsers from '../../modules/db-users'; 
import { sendUnexpectedError } from '../../modules/error-handler';
import { RequestTypesEnum } from '../../types/enums/request-type.enum';
import { PermissionsEnum } from '../../types/enums/permissions.enum';
import { BaseRequest } from '../../types/base-request';

export async function action(type: RequestTypesEnum, req: any, res: any) {
    if (type === RequestTypesEnum.get) {
        try {

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
