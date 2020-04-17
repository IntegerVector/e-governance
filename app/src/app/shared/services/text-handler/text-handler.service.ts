import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TextHandlerService {
    public handle(textTemplate: string, ...params: string[]): string {
        return textTemplate.replace(/(\{)(\d+)(\})/i, (match, p1, p2, p3, string) => {
            return params[+p2];
        });
    }
}
