export function normalize(date: string): string {
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
        return `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}`;
    }

    return date;
}

export function getDate(date: Date): string {
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
}

export function toLocalDate(date: string): string {
    const newDate = new Date(date);

    return `${newDate.getDate()}.${newDate.getMonth() + 1}.${newDate.getFullYear()}`;
}
