import * as dbUsers from '../../modules/db-users'; 
import { RequestTypesEnum } from '../../types/enums/request-type.enum';
import { UserDTO } from '../../types/dto/user-dto';
import { CLIENT_INVALID_LOGIN_OR_PASS } from '../../constants/errors';

export async function action(type: RequestTypesEnum, req: any, res: any) {
    if (req.body.type === RequestTypesEnum.get) {
        try {
            const user = await dbUsers.userLogIn(
                req.body.data.login,
                req.body.data.pass
            );

            const responce: UserDTO = {
                type,
                data: user,
                userId: user.userId,
                userToken: user.userToken,
                error: null
            };
            res.send(responce);
        }
        catch(err) {
            const responce: UserDTO = {
                type,
                data: null,
                userId: null,
                userToken: null,
                error: {
                    errCode: null,
                    errMsg: CLIENT_INVALID_LOGIN_OR_PASS,
                    errTip: null
                }
            };
            res.send(responce);
        }
    }
}
