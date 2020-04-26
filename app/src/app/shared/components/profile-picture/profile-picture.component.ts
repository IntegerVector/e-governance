import { Component, Input, OnChanges } from '@angular/core';

import { User } from '../../types/dto/user-dto';
import { ProfilePictureSizes } from './types/profile-picture-sizes.enum';

@Component({
    selector: 'app-profile-picture',
    template: `<img
                    *ngIf="picturePath && picturePath !== '/files/user-data'"
                    class="user-picture"
                    [src]="picturePath"
                    alt="User Profile picture">
                <span
                    *ngIf="!picturePath || picturePath === '/files/user-data'"
                    class="user-picture"
                    [ngStyle]="{
                        'background-color': BGColor,
                        'color': TextColor,
                        'height': sizeInRems + 'rem',
                        'width': sizeInRems + 'rem'
                    }"
                >
                {{ user.userFirstName[0] + user.userLastName[0] }}
                </span>`,
    styleUrls: ['./profile-picture.scss']
})
export class ProfilePictureComponent implements OnChanges {
    @Input() picturePath: string;
    @Input() user: User;
    @Input() sizeInRems?: number = ProfilePictureSizes.Small;

    public BGColor: string;
    public TextColor: string;

    public ngOnChanges(): void {
        const color = this.user.userId % 5;

        switch (color) {
            case 0: this.BGColor = '#FFF6BD'; break;
            case 1: this.BGColor = '#F395A5'; break;
            case 2: this.BGColor = '#E6CCA5'; break;
            case 3: this.BGColor = '#6EC4C6'; break;
            case 4: this.BGColor = '#31FFE0'; break;
            default: this.BGColor = '#FFF6BD';
        }

        this.TextColor = this.getTextColor(this.BGColor);
    }

    private getTextColor(hex: string): string {
        const r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16);
        const g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16);
        const b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
        return '#' + this.padZero(r) + this.padZero(g) + this.padZero(b);
    }

    private padZero(str: string): string {
        const zeros = new Array(2).join('0');
        return (zeros + str).slice(-2);
    }
}
