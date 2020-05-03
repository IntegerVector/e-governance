import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { MainPageModule } from './components/main-page/main-page.module';
import { ErrorModule } from '../error/error.module';
import { SharedModule } from '../shared/shared.module';
import { NavigationPanelComponent } from './components/navigation-panel/navigation-panel.component';
import { UserPageComponent } from './components/user-authorization/user-page.component';
import { NotificationComponent } from './components/notification/notification.component';
import { NotificationsService } from './components/notification/services/notifications.service';

@NgModule({
    declarations: [
        NavigationPanelComponent,
        UserPageComponent,
        NotificationComponent
    ],
    exports: [
        NavigationPanelComponent,
        NotificationComponent
    ],
    imports: [
        FormsModule,
        BrowserModule,
        RouterModule,
        MainPageModule,
        SharedModule,
        ErrorModule,
    ],
    providers: [
        NotificationsService
    ],
})
export class PageComponentsModule { }
