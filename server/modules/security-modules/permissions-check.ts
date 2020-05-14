import * as _ from 'lodash';

import { PermissionsEnum } from '../../types/enums/permissions.enum';
import { SQLManagerSingleton } from '../db-modules/sql-manager';

const sql = SQLManagerSingleton.getInstance();

export async function checkPermissions(
    userId: string,
    permissions: PermissionsEnum[]
): Promise<boolean> {
    const userPermissions = await sql.getUserPermissions(userId);
    const intersection = _.intersection(permissions, userPermissions);
    return _.get(intersection, 'length') === permissions.length
        ? true
        : false;
}
