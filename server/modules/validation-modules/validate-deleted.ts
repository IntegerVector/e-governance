import { SQLManagerSingleton } from '../db-modules/sql-manager';

const sql = SQLManagerSingleton.getInstance();

export async function checkIfDocumentDeleted(documentId: string): Promise<boolean> {
    const document = await sql.getDocumentByDocumentId(documentId);

    return !!document.sys_DeletedBy || !!document.sys_DeletedDate;
}

export async function checkIfUserDeleted(userId: string): Promise<boolean> {
    const user = await sql.getUserById(userId);

    return !!user.sys_DeletedBy || !!user.sys_DeletedDate;
}
