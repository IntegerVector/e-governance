import { RequestTypes } from "../types/enums/request-type.enum";
import { getFile } from "../actions/files-action";

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

    public static async execute(
        actionName: string,
        type: RequestTypes,
        req: any,
        res: any
    ): Promise<void> {
        await this.actions[actionName](type, req, res);
    }
}

/** Actions: */
Actions.add("GetFile", getFile);
