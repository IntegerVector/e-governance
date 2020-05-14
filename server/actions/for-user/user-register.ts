import * as dbUsers from '../../modules/db-modules/db-users'; 
import { sendUnexpectedError } from '../../modules/error-handler';
import { RequestTypesEnum } from '../../types/enums/request-type.enum';
import { UserDTO } from '../../types/dto/user-dto';

export async function action(type: RequestTypesEnum, req: any, res: any) {
    if (type === RequestTypesEnum.post) {
        try {
            const newUser = await dbUsers.userRegister(
                req.body.userId,
                req.body.userToken,
                req.body.data
            );

            const responce: UserDTO = {
                type,
                userId: req.body.userId,
                userToken: req.body.userToken,
                data: newUser,
                error: null
            };

            res.send(responce);
        }
        catch(err) {
            sendUnexpectedError(type, req, res);
        }
    }
}
