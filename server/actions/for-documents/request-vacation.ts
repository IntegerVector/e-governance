import * as _ from 'lodash';

import * as dbDocuments from '../../modules/db-modules/db-documents';
import { RequestTypesEnum } from '../../types/enums/request-type.enum';
import { BaseRequest } from '../../types/base-request';
import { checkUser } from '../../modules/security-modules/check-user';
import { checkPermissions } from '../../modules/security-modules/permissions-check';
import { PermissionsEnum } from '../../types/enums/permissions.enum';
import { UsersDocuments } from '../../types/dto/users-documents-dto';
import { checkIfDocumentDeleted } from '../../modules/validation-modules/validate-deleted';
import { requestAcademicVacation } from '../../modules/academic-vacation';
import { sendError, sendUnexpectedError } from '../../modules/validation-modules/error-handler';

export async function action(type: RequestTypesEnum, req: any, res: any) {
    if (type === RequestTypesEnum.post) {
        try {
            const error = await checkUser(req.body.userId, req.body.userToken);
            if (error) {
                req.body.error = error;
                sendError(type, req, res);
                return;
            }

            const result = await requestAcademicVacation(req.body.data);

            console.dir(result);
            // const userDataId = req.body.data.userDataId;
            // const documents = await dbDocuments.getUserDocuments(userDataId);

            // const validDocsPromises = _.map(documents, async document => {
            //     const isDeleted = await checkIfDocumentDeleted(document.documentId);
            //     return isDeleted ? null: document;
            // });

            // const validDocs = _.omitBy(await Promise.all(validDocsPromises), _.isNull);

            // const responce: BaseRequest<UsersDocuments[]> = {
            //     type,
            //     error: null,
            //     userId: req.body.userId,
            //     userToken: req.body.userToken,
            //     data: _.filter(validDocs, document => !document.needsActions)
            // };
            
            res.send(true);
        }
        catch(err) {
            sendUnexpectedError(type, req, res);
        }
    }
}