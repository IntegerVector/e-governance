import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ErrorModule } from '../error/error.module';
import { NavigationPanelComponent } from './components/navigation-panel/navigation-panel.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { UserAuthorizationComponent } from './components/user-authorization/user-authorization.component';

@NgModule({
  declarations: [
    NavigationPanelComponent,
    MainPageComponent,
    UserAuthorizationComponent
  ],
  exports: [
    NavigationPanelComponent
  ],
  imports: [
    BrowserModule,
    ErrorModule
  ],
  providers: [],
})
export class PageComponentsModule { }
