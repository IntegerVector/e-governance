import * as dbDocuments from '../../modules/db-modules/db-documents';
import { RequestTypesEnum } from '../../types/enums/request-type.enum';
import { BaseRequest } from '../../types/base-request';
import { Documents } from '../../types/dto/documents-dto';
import { checkUser } from '../../modules/security-modules/check-user';
import { checkPermissions } from '../../modules/security-modules/permissions-check';
import { PermissionsEnum } from '../../types/enums/permissions.enum';
import { checkIfDocumentDeleted } from '../../modules/validation-modules/validate-deleted';
import { DOCUMENT_ALRADY_DELETED } from '../../constants/errors';
import { sendError, sendErrorInvalidPermissions, sendUnexpectedError } from '../../modules/validation-modules/error-handler';

export async function action(type: RequestTypesEnum, req: any, res: any) {
    if (type === RequestTypesEnum.get) {
        try {
            const error = await checkUser(req.body.userId, req.body.userToken);
            if (error) {
                req.body.error = error;
                sendError(type, req, res);
                return;
            }

            const isPermitted = await checkPermissions(req.body.userId, [PermissionsEnum.ReadDocs]);
            if (!isPermitted) {
                sendErrorInvalidPermissions(type, req, res);
                return;
            }

            const documentId = req.body.data.documentId;

            const isAlreadyDeleted = await checkIfDocumentDeleted(documentId);
            if (isAlreadyDeleted) {
                req.body.error = {
                    errCode: '0',
                    errMsg: DOCUMENT_ALRADY_DELETED,
                    errTip: ''
                };
                sendError(type, req, res);
                return;
            }

            const document = await dbDocuments.getDocumentById(documentId);

            const responce: BaseRequest<Documents> = {
                type,
                error: null,
                userId: req.body.userId,
                userToken: req.body.userToken,
                data: document
            };
            
            res.send(responce);
        }
        catch(err) {
            sendUnexpectedError(type, req, res);
        }
    }
}