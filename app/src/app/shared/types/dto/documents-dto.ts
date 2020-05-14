import { BaseRequest } from '../base-request';


export type DocumentsDTO = BaseRequest<Documents>;

export type Documents = {
    documentId: number;
    name: string;
    path: string;
    documentType: number;
    sys_AddedBy: number;
    sys_AddedDate: string;
    sys_UpdatedBy: number;
    sys_UpdatedDate: string;
    sys_DeletedBy: number;
    sys_DeletedDate: string;
};
