import * as dbGetter from '../../modules/db-modules/db-data-getters';
import { RequestTypesEnum } from '../../types/enums/request-type.enum';
import { BaseRequest } from '../../types/base-request';
import { DocumentTypes } from '../../types/dto/document-types-dto';
import { sendUnexpectedError } from '../../modules/validation-modules/error-handler';

export async function action(type: RequestTypesEnum, req: any, res: any) {
    if (type === RequestTypesEnum.get) {
        try {
            const documentTypes = await dbGetter.getDocumentTypes();

            const responce: BaseRequest<{ documentTypes: DocumentTypes[] }> = {
                type,
                error: null,
                userId: req.body.userId,
                userToken: req.body.userToken,
                data: {
                    documentTypes
                }
            };
            
            res.send(responce);
        }
        catch(err) {
            sendUnexpectedError(type, req, res);
        }
    }
}