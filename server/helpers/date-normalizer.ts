export function normalize(date: Date): string {
    if (!date) {
        return 'NULL';
    }

    date = new Date(date.toString());
    return `${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDate()+1}`;
}
