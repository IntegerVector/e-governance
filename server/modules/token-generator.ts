import * as base64 from 'base-64';
import * as utf8 from 'utf8';

export function getToken(userLogin: string, userPass: string, userFirstName: string, userLastName: string): string {
    const value = utf8.encode(`${userFirstName}:${userLogin}:${userLastName}-${userPass}`);
    const encodedValue = base64.encode(value).toString();

    return String.prototype.slice.call(encodedValue.repeat(16), 0, 64);
}
