import { Injectable } from '@angular/core';
import { Observable, of, Subscriber } from 'rxjs';
import { NotificationType } from '../types/notification-type.enum';
import { Notification } from '../types/notification-type.interface';

@Injectable({
    providedIn: 'root'
})
export class NotificationsService {

    private subscriber: Subscriber<Notification>;
    private notifications = new Observable(subscriber => {
        subscriber.next({
            text: '',
            type: NotificationType.Info
        });
        this.subscriber = subscriber;
    });

    public push(text: string, type: NotificationType): void {
        if (this.subscriber) {
            this.subscriber.next({
                text,
                type
            });
        }
    }

    public subscribe(fn: (params: Notification) => void) {
        this.notifications.subscribe(fn);
    }
}
