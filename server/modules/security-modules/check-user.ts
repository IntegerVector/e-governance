import { ErrorObjectInterface } from '../../types/interfaces/error0bject.interface';
import { SQLManagerSingleton } from '../db-modules/sql-manager';
import { CLIENT_INVALID_USER_ID, CLIENT_INVALID_TOKEN } from '../../constants/errors';

const sql = SQLManagerSingleton.getInstance();

export async function checkUser(id: string, token: string): Promise<ErrorObjectInterface> {
    if (!await sql.checkUserId(id)) {
        return {
            errCode: '550',
            errMsg: CLIENT_INVALID_USER_ID,
            errTip: ''
        };
    }

    if (!await sql.checkToken(id, token)) {
        return {
            errCode: '550',
            errMsg: CLIENT_INVALID_TOKEN,
            errTip: ''
        };
    }

    return null;
}