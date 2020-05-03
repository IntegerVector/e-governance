import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { SharedModule } from 'src/app/shared/shared.module';
import { ErrorModule } from 'src/app/error/error.module';
import { MainPageAboutComponent } from './components/about.component';
import { MainPageComponent } from './main-page.component';


@NgModule({
    declarations: [
        MainPageComponent,
        MainPageAboutComponent
    ],
    exports: [
        MainPageComponent
    ],
    imports: [
        FormsModule,
        BrowserModule,
        RouterModule,
        SharedModule,
        ErrorModule
    ],
    providers: [],
})
export class MainPageModule { }