import { SQLManagerSingleton } from './sql-manager';
import { Documents } from "../../types/dto/documents-dto";
import { UsersDocuments } from '../../types/dto/users-documents-dto';

const sql = SQLManagerSingleton.getInstance();

export async function getDocumentById(documentId: string): Promise<Documents> {
    try {
        return await sql.getDocumentByDocumentId(documentId);
    }
    catch(err) {
        return null;
    }
}

export async function getUserDocuments(userDataId: string): Promise<UsersDocuments[]> {
    try {
        return await sql.getDocumentsByUserDataId(userDataId);
    }
    catch(err) {
        return null;
    }
}

export async function deleteDocument(userId: string, documentId: string): Promise<boolean> {
    try {
        return await sql.deleteDocument(userId, documentId);
    }
    catch(err) {
        return false;
    }
}
