import { SQLManagerSingleton } from '../db-modules/sql-manager';

const sql = SQLManagerSingleton.getInstance();

export async function checkIfDocumentDeleted(documentId: string): Promise<boolean> {
    const document = await sql.getDocumentByDocumentId(documentId);

    return !!document.sys_DeletedBy || !!document.sys_DeletedDate;
}