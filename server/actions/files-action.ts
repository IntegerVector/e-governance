import { resolve } from 'path';

export async function getFile(req: any, res: any) {
    console.log(req);
    // res.sendFile(resolve('index.html'));
}
