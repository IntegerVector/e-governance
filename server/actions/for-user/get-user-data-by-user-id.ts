import * as dbUsers from '../../modules/db-users'; 
import { sendUnexpectedError } from '../../modules/error-handler';
import { RequestTypesEnum } from '../../types/enums/request-type.enum';
import { UserDataDTO } from '../../types/dto/user-data-dto';

export async function action(type: RequestTypesEnum, req: any, res: any) {
    if (type === RequestTypesEnum.get) {
        try {
            const userData = await dbUsers.getUserDataByUserId(
                req.body.userId,
                req.body.userToken,
                req.body.data.userId
            );

            const responce: UserDataDTO = {
                type,
                userId: req.body.userId,
                userToken: req.body.userToken,
                error: null,
                data: userData
            };

            res.send(responce);
        }
        catch(err) {
            sendUnexpectedError(type, req, res);
        }
    }
}
