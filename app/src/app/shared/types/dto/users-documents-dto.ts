import { BaseRequest } from '../base-request';


export type UsersDocumentsDTO = BaseRequest<UsersDocuments>;

export type UsersDocuments = {
    id: number;
    userDataId: number;
    documentId: number;
    needsActions: boolean;
};
