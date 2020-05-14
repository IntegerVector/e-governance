import * as dbGetter from '../../modules/db-modules/db-data-getters';
import { sendUnexpectedError } from '../../modules/error-handler';
import { BaseRequest } from '../../types/base-request';
import { UserType } from '../../types/dto/user-type-dto';
import { RequestTypesEnum } from '../../types/enums/request-type.enum';


export async function action(type: RequestTypesEnum, req: any, res: any) {
    if (type === RequestTypesEnum.get) {
        try {
            const types = await dbGetter.getTypes();

            const responce: BaseRequest<{ types: UserType[] }> = {
                type,
                error: null,
                userId: req.body.userId,
                userToken: req.body.userToken,
                data: {
                    types
                }
            };
            
            res.send(responce);
        }
        catch(err) {
            sendUnexpectedError(type, req, res);
        }
    }   
}
