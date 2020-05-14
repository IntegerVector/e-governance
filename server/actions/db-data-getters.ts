import { RequestTypesEnum } from '../types/enums/request-type.enum';
import { sendUnexpectedError } from '../modules/error-handler';
import { SQLManagerSingleton } from '../modules/sql-manager';
import { BaseRequest } from '../types/base-request';
import { UserStatusEnum } from '../types/enums/user-status.enum';
import { UserType } from '../types/dto/user-type-dto';
import { UserStatus } from '../types/dto/user-status-dto';
import * as dbGetter from '../modules/db-data-getters';

export async function getStatuses(type: RequestTypesEnum, req: any, res: any) {
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

export async function getTypes(type: RequestTypesEnum, req: any, res: any) {
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
