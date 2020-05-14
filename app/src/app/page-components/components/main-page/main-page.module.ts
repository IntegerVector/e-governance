import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { SharedModule } from 'src/app/shared/shared.module';
import { ErrorModule } from 'src/app/error/error.module';
import { MainPageAboutComponent } from './components/about/about.component';
import { MainPageComponent } from './main-page.component';
import { MainPageDocumentsComponent } from './components/documents/documents.component';


@NgModule({
    declarations: [
        MainPageComponent,
        MainPageAboutComponent,
        MainPageDocumentsComponent
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
