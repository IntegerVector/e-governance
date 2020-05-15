import { SQLManagerSingleton } from '../db-modules/sql-manager';

const sql = SQLManagerSingleton.getInstance();

export async function isUserLoginUnic(login: string): Promise<boolean> {
    const request = `select * from UserData where login = "${login}";`;
    const result = await sql.query(request);

    if (result.length) {
        return false;
    }

    return true;
}