import * as dbUsers from '../../modules/db-users'; 
import { sendUnexpectedError } from '../../modules/error-handler';
import { UserDTO } from '../../types/dto/user-dto';
import { RequestTypesEnum } from '../../types/enums/request-type.enum';

export async function action(type: RequestTypesEnum, req: any, res: any) {
    if (type === RequestTypesEnum.post) {
        try {
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
