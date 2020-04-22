import { RequestTypesEnum } from '../types/enums/request-type.enum';
import {
    sendUnexpectedError,
    sendErrorInvalidUserId,
    sendErrorInvalidToken
} from './error-handler';
import { SQLManagerSingleton } from '../modules/sql-manager';
import { BaseRequest } from '../types/base-request';
import { UserStatusEnum } from '../types/enums/user-status.enum';
import { UserType } from '../types/dto/user-type-dto';

const sql = SQLManagerSingleton.getInstance();

export async function getStatuses(type: RequestTypesEnum, req: any, res: any) {
    if (type === RequestTypesEnum.get) {
        try {
            if (!await sql.checkUserId(req.body.userId)) {
                sendErrorInvalidUserId(type, req,  res);
                return;
            }
    
            if (!await sql.checkToken(req.body.userId, req.body.userToken)) {
                sendErrorInvalidToken(type, req, res);
                return;
            }

            const statuses = await sql.getStatuses();

            const responce: BaseRequest<{ statuses: UserStatusEnum[] }> = {
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
            if (!await sql.checkUserId(req.body.userId)) {
                sendErrorInvalidUserId(type, req,  res);
                return;
            }
    
            if (!await sql.checkToken(req.body.userId, req.body.userToken)) {
                sendErrorInvalidToken(type, req, res);
                return;
            }

            const types = await sql.getTypes();

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
