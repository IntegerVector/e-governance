import { Component, Input } from '@angular/core';

import { User } from '../../types/dto/user-dto';

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
                    [ngStyle]="{'background-color': getColor()}"
                >
                {{ user.userFirstName[0] }}
                </span>`,
    styleUrls: ['./profile-picture.scss']
})
export class ProfilePictureComponent {
    @Input() picturePath: string;
    @Input() user: User;

    public getColor(): string {
        const color = this.user.userId.toString().repeat(6);

        return `#${color.slice(0, 6)}`;
    }
}
