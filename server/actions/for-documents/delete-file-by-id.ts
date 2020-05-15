import * as dbDocuments from '../../modules/db-modules/db-documents';
import { sendUnexpectedError, sendError, sendErrorInvalidPermissions } from '../../modules/error-handler';
import { RequestTypesEnum } from '../../types/enums/request-type.enum';
import { BaseRequest } from '../../types/base-request';
import { checkUser } from '../../modules/security-modules/check-user';
import { checkPermissions } from '../../modules/security-modules/permissions-check';
import { PermissionsEnum } from '../../types/enums/permissions.enum';
import { CLIENT_UNEXPECTED_ERROR, CLIENT_UNEXPECTED_ERROR_TIP, DOCUMENT_ALRADY_DELETED } from '../../constants/errors';
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

            const isPermitted = await checkPermissions(req.body.userId, [PermissionsEnum.DeleteDocs]);
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

            const isDeleted = await dbDocuments.deleteDocument(req.body.userId, documentId);

            const responce: BaseRequest<boolean> = isDeleted
                ? {
                    type,
                    error: null,
                    userId: req.body.userId,
                    userToken: req.body.userToken,
                    data: true
                }
                : {
                    type,
                    error: {
                        errCode: '',
                        errMsg: CLIENT_UNEXPECTED_ERROR,
                        errTip: CLIENT_UNEXPECTED_ERROR_TIP
                    },
                    userId: req.body.userId,
                    userToken: req.body.userToken,
                    data: false
                };
            
            res.send(responce);
        }
        catch(err) {
            sendUnexpectedError(type, req, res);
        }
    }
}