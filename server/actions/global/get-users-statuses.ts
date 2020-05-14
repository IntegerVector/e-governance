import * as dbGetter from '../../modules/db-data-getters';
import { sendUnexpectedError } from '../../modules/error-handler';
import { BaseRequest } from '../../types/base-request';
import { UserStatus } from '../../types/dto/user-status-dto';
import { RequestTypesEnum } from '../../types/enums/request-type.enum';

export async function action(type: RequestTypesEnum, req: any, res: any) {
    if (type === RequestTypesEnum.get) {
        try {
            const statuses = await dbGetter.getStatuses();

            const responce: BaseRequest<{ statuses: UserStatus[] }> = {
                type,
                error: null,
                userId: req.body.userId,
                userToken: req.body.userToken,
                data: {
                    statuses
                }
            };
            
            res.send(responce);
        }
        catch(err) {
            sendUnexpectedError(type, req, res);
        }
    }
}
