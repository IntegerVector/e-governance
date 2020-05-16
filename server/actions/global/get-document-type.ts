import * as dbGetter from '../../modules/db-modules/db-data-getters';
import { RequestTypesEnum } from '../../types/enums/request-type.enum';
import { BaseRequest } from '../../types/base-request';
import { DocumentTypes } from '../../types/dto/document-types-dto';
import { DocumentTypesEnum } from '../../types/enums/document-types.enum';
import { sendUnexpectedError } from '../../modules/validation-modules/error-handler';

export async function action(type: RequestTypesEnum, req: any, res: any) {
    if (type === RequestTypesEnum.get) {
        try {
            const documentType = await dbGetter.getDocumentTypeById(req.body.data.documentTypeId);

            const responce: BaseRequest<DocumentTypesEnum> = {
                type,
                error: null,
                userId: req.body.userId,
                userToken: req.body.userToken,
                data: documentType
            };
            
            res.send(responce);
        }
        catch(err) {
            sendUnexpectedError(type, req, res);
        }
    }
}