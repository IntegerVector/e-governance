import { SQLManagerSingleton } from './sql-manager';
import { Documents } from "../../types/dto/documents-dto";

const sql = SQLManagerSingleton.getInstance();

export async function getDocumentById(documentId: string): Promise<Documents> {
    try {
        return await sql.getDocumentByDocumentId(documentId);
    }
    catch(err) {
        return null;
    }
}
