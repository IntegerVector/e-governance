export function normalize(date: string): string {
    console.dir(date);
    if (!date) {
        return 'NULL';
    }
    if (/nan/i.test(date)) {
        return 'NULL';
    }
    if (/undefined/i.test(date)) {
        return 'NULL';
    }
    if (/now/i.test(date)) {
        const now = new Date();
        return `${now.getUTCFullYear()}-${now.getUTCMonth()}-${now.getUTCDate()+1}`;
    }

    return date;
}
