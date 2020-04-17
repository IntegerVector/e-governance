import { RequestTypes } from "../types/enums/request-type.enum";
import { getUserById, userLogIn, userRegister, userUpdate, getUserPermissions } from '../actions/users-actions';

export class Actions {
    private static actions: any = {};

    public static add(
        actionName: string,
        actionFunction: (type: RequestTypes, req: any, res: any) => Promise<void>
    ): void {
        this.actions[actionName] = actionFunction;
    }

    public static remove(actionName: string): void {
        this.actions[actionName] = null;
    }

    public static execute(
        actionName: string,
        type: RequestTypes,
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
