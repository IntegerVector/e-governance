import { SQLManagerSingleton } from './sql-manager';
import { UserType } from '../../types/dto/user-type-dto';
import { UserStatus } from '../../types/dto/user-status-dto';

const sql = SQLManagerSingleton.getInstance();

export async function getStatuses(): Promise<UserStatus[]> {
    try {
        return await sql.getStatuses();
    }
    catch(err) {
        return null;
    }
}

export async function getTypes(): Promise<UserType[]> {
    try {
        return await sql.getTypes();
    }
    catch(err) {
        return null;
    }
}
