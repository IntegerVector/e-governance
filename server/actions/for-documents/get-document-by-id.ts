import * as dbDocuments from '../../modules/db-modules/db-documents';
import { sendUnexpectedError, sendError } from '../../modules/error-handler';
import { RequestTypesEnum } from '../../types/enums/request-type.enum';
import { BaseRequest } from '../../types/base-request';
import { DocumentTypes } from '../../types/dto/document-types-dto';
import { Documents } from '../../types/dto/documents-dto';
import { SQLManagerSingleton } from '../../modules/db-modules/sql-manager';
import { checkUser } from '../../modules/security-modules/check-user';

const sql = SQLManagerSingleton.getInstance();

export async function action(type: RequestTypesEnum, req: any, res: any) {
    if (type === RequestTypesEnum.get) {
        try {
            const error = await checkUser(req.body.userId, req.body.userToken);
            if (error) {
                req.body.error = error;
                sendError(type, req, res);
                return;
            }

            const documentId = req.body.data.documentId;
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