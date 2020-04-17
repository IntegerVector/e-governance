import { Pipe, PipeTransform } from '@angular/core';

import { TextHandlerService } from './text-handler.service';

@Pipe({ name: 'handleText' })
export class TextHandlerPipe implements PipeTransform {
    constructor(private textHandlerService: TextHandlerService) {}

    public transform(value: string, ...fillWithText: string[]): string {
        return this.textHandlerService.handle(value, ...fillWithText);
    }
}
