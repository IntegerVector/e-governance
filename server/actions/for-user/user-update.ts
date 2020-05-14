import * as dbUsers from '../../modules/db-modules/db-users'; 
import { sendUnexpectedError, sendError } from '../../modules/error-handler';
import { UserDTO } from '../../types/dto/user-dto';
import { RequestTypesEnum } from '../../types/enums/request-type.enum';
import { checkUser } from '../../modules/security-modules/check-user';

export async function action(type: RequestTypesEnum, req: any, res: any) {
    if (type === RequestTypesEnum.post) {
        try {
            const error = await checkUser(req.body.userId, req.body.userToken);
            if (error) {
                req.body.error = error;
                sendError(type, req, res);
                return;
            }

            const updatedUser = await dbUsers.userUpdate(
                req.body.userId,
                req.body.userToken,
                req.body.data
            );

            const responce: UserDTO = {
                type,
                userId: req.body.userId,
                userToken: req.body.userToken,
                data: updatedUser,
                error: null
            };

            res.send(responce);
        }
        catch(err) {
            sendUnexpectedError(type, req, res);
        }
    }
}
