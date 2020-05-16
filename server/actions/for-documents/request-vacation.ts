import * as _ from 'lodash';

import { RequestTypesEnum } from '../../types/enums/request-type.enum';
import { checkUser } from '../../modules/security-modules/check-user';
import { requestAcademicVacation } from '../../modules/academic-vacation';
import { sendError, sendUnexpectedError } from '../../modules/validation-modules/error-handler';
import { DOCUMENTS_FILES_PATH } from '../../constants/constants';
import { SQLManagerSingleton } from '../../modules/db-modules/sql-manager';
import { DocumentTypesEnum } from '../../types/enums/document-types.enum';
import { BaseRequest } from '../../types/base-request';

const sql = SQLManagerSingleton.getInstance();

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

            const fileName = _.get(result, 'filename').match(/\/\w+\.pdf/i)[0];
            const filePath = DOCUMENTS_FILES_PATH + fileName;

            const documentId = await sql.addDocument(
                req.body.data.userId,
                'Academic Vacation Request',
                filePath,
                DocumentTypesEnum.PDF
            );

            const user = await sql.getUserById(req.body.data.userId);
            const targetUser = await sql.getUserById('11');

            await sql.addUsersDocuments(user.userDataId.toString(), documentId, true);
            await sql.addUsersDocuments(targetUser.userDataId.toString(), documentId, true);

            const responce: BaseRequest<boolean> = {
                type,
                userId: req.body.userId,
                userToken: req.body.userToken,
                error: null,
                data: true
            }

            res.send(responce);
        }
        catch(err) {
            sendUnexpectedError(type, req, res);
        }
    }
}
