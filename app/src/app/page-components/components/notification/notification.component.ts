import { Component, Input } from '@angular/core';
import { NotificationType } from './types/notification-type.enum';

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {
    @Input() text = '';
    @Input() type = NotificationType.Info;
}
