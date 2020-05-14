import * as dbUsers from '../../modules/db-modules/db-users'; 
import { sendUnexpectedError, sendError } from '../../modules/error-handler';
import { RequestTypesEnum } from '../../types/enums/request-type.enum';
import { UserDataDTO } from '../../types/dto/user-data-dto';
import { checkUser } from '../../modules/security-modules/check-user';

export async function action(type: RequestTypesEnum, req: any, res: any) {
    if (type === RequestTypesEnum.get) {
        try {
            const error = await checkUser(req.body.userId, req.body.userToken);
            if (error) {
                req.body.error = error;
                sendError(type, req, res);
                return;
            }

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
