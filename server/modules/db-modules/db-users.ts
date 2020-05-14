import { SQLManagerSingleton } from './sql-manager';
import { PermissionsEnum } from '../../types/enums/permissions.enum';
import { User } from '../../types/dto/user-dto';
import { UserData } from '../../types/dto/user-data-dto';
import { normalize } from '../../helpers/date-normalizer';
import { USER_DATA_FILES_PATH } from '../../constants/constants';

const sql = SQLManagerSingleton.getInstance();

export async function userLogIn(login: string, pass: string): Promise<User> {
    try {
        const userDataId = await sql.findUserDataId(login, pass); 
        return await sql.findUserByUserDataId(userDataId);
    }
    catch(err) {
        return null;
    }
}

export async function userRegister(
    operatorId: string,
    operatorToken: string,
    newUser: User & UserData
): Promise<User> {
    try {
        const permissions = await sql.getUserPermissions(operatorId);

        if (!permissions.find(permission => permission === PermissionsEnum.AddUser)) {
            return null;
        }

        const admin = await sql.getUserById(operatorId);
        const userToAdd = {
            ...newUser,
            userBirthDate: normalize(newUser.userBirthDate),
            sys_AddedDate: normalize('now'),
            sys_UpdatedDate: normalize(newUser.sys_UpdatedDate),
            sys_DeletedDate: normalize(newUser.sys_DeletedDate),
            validFrom: normalize(newUser.validFrom),
            validTo: normalize(newUser.validTo),
            profilePicturePath: newUser.profilePicturePath || USER_DATA_FILES_PATH
        };
        const newUserId = await sql.addUser(admin, userToAdd);
        return await sql.getUserById(newUserId);
    }
    catch(err) {
        return null;
    }
}

export async function userUpdate(
    operatorId: string,
    operatorToken: string,
    user: User & UserData
): Promise<User> {
    try {
        if (operatorId != user.userId.toString()) {
            const permissions = await sql.getUserPermissions(operatorId.toString());

            if (!permissions.find(permission => permission === PermissionsEnum.UpdateUser)) {
                return null;
            }
        }

        const admin = await sql.getUserById(operatorId.toString());
        const userToUpdate = {
            ...user,
            userBirthDate: normalize(user.userBirthDate),
            sys_AddedDate: normalize(user.sys_AddedDate),
            sys_UpdatedDate: normalize('now'),
            sys_DeletedDate: normalize(user.sys_DeletedDate),
            validFrom: normalize(user.validFrom),
            validTo: normalize(user.validTo),
            profilePicturePath: user.profilePicturePath || 'NULL'
        };
        const updatedUserId = await sql.updateUser(admin, userToUpdate);
        return await sql.getUserById(updatedUserId);
    }
    catch(err) {
        return null;
    }
}

export async function getUserById(
    operatorId: string,
    operatorToken: string,
    userId: string
): Promise<User> {
    try {
        if (operatorId != userId) {
            const permissions = await sql.getUserPermissions(operatorId);

            if (!permissions.find(permission => permission === PermissionsEnum.ReadUsers)) {
                return null;
            }
        }

        return await sql.getUserById(userId);
    }
    catch(err) {
        return null;
    }
}

export async function getUserDataByUserId(
    operatorId: string,
    operatorToken: string,
    userId: string
): Promise<UserData> {
    try {
        if (operatorId != userId) {
            const permissions = await sql.getUserPermissions(operatorId);

            if (!permissions.find(permission => permission === PermissionsEnum.ReadUsers)) {
                return null;
            }
        }

        const user = await sql.getUserById(userId);
        const userData = await sql.getUserDataById(user.userDataId.toString());
        userData.pass = null;
        return userData;
    }
    catch(err) {
        return null;
    }
}

export async function getUserPermissions(userId: string): Promise<PermissionsEnum[]> {
    try {
        return await sql.getUserPermissions(userId);
    }
    catch(err) {
        return null;
    }
}
