import * as _ from 'lodash';

import * as dbDocuments from '../../modules/db-modules/db-documents';
import { sendUnexpectedError, sendError, sendErrorInvalidPermissions } from '../../modules/error-handler';
import { RequestTypesEnum } from '../../types/enums/request-type.enum';
import { BaseRequest } from '../../types/base-request';
import { checkUser } from '../../modules/security-modules/check-user';
import { checkPermissions } from '../../modules/security-modules/permissions-check';
import { PermissionsEnum } from '../../types/enums/permissions.enum';
import { UsersDocuments } from '../../types/dto/users-documents-dto';
import { checkIfDocumentDeleted } from '../../modules/validation-modules/validate-deleted';

export async function action(type: RequestTypesEnum, req: any, res: any) {
    if (type === RequestTypesEnum.post) {
        try {
            const error = await checkUser(req.body.userId, req.body.userToken);
            if (error) {
                req.body.error = error;
                sendError(type, req, res);
                return;
            }

            const id = req.body.data.usersDocumentsId;
            const result = await dbDocuments.signADoc(id);

            if (!result) {
                sendUnexpectedError(type, req, res);
                return;
            }

            const responce: BaseRequest<boolean> = {
                type,
                error: null,
                userId: req.body.userId,
                userToken: req.body.userToken,
                data: true
            };
            
            res.send(responce);
        }
        catch(err) {
            sendUnexpectedError(type, req, res);
        }
    }
}