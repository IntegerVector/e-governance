import { NotificationType } from './notification-type.enum';

export interface Notification {
    text: string;
    type: NotificationType;
}
