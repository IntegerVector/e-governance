import { RequestTypesEnum } from "../types/enums/request-type.enum";
import { getUserById, userLogIn, userRegister, userUpdate, getUserPermissions, getUserDataByUserId } from '../actions/users-actions';
import { getStatuses, getTypes } from '../actions/db-data-getters';

export class Actions {
    private static actions: any = {};

    public static add(
        actionName: string,
        actionFunction: (type: RequestTypesEnum, req: any, res: any) => Promise<void>
    ): void {
        this.actions[actionName] = actionFunction;
    }

    public static remove(actionName: string): void {
        this.actions[actionName] = null;
    }

    public static execute(
        actionName: string,
        type: RequestTypesEnum,
        req: any,
        res: any
    ): void {
        this.actions[actionName](type, req, res);
    }
}

/** Actions: */
Actions.add('GetUserById', getUserById);
Actions.add('UserLogIn', userLogIn);
Actions.add('UserRegister', userRegister);
Actions.add('UserUpdate', userUpdate);
Actions.add('GetUserPermissions', getUserPermissions);
Actions.add('GetUserDataByUserId', getUserDataByUserId);
Actions.add('GetUsersStatuses', getStatuses);
Actions.add('GetUsersTypes', getTypes);
