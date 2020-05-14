import * as dbUsers from '../../modules/db-users'; 
import { sendUnexpectedError } from '../../modules/error-handler';
import { RequestTypesEnum } from '../../types/enums/request-type.enum';
import { UserDTO } from '../../types/dto/user-dto';

export async function action(type: RequestTypesEnum, req: any, res: any) {
    if (req.body.type === RequestTypesEnum.get) {
        try {
            const user = await dbUsers.getUserById(
                req.body.userId,
                req.body.userToken,
                req.body.data.userId
            );

            const responce: UserDTO = {
                type,
                userId: req.body.userId,
                userToken: req.body.userToken,
                data: user,
                error: null
            }

            res.send(responce);
        }
        catch(err) {
            sendUnexpectedError(type, req, res);
        }
    }
}
