import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { SharedModule } from 'src/app/shared/shared.module';
import { ErrorModule } from 'src/app/error/error.module';
import { MainPageDocumentsComponent } from './documents.component';
import { ItemsListComponent } from './components/items-list/items-list.component';
import { DocumentPreviewComponent } from './components/document-preview/document-preview.component';

@NgModule({
    declarations: [
        MainPageDocumentsComponent,
        ItemsListComponent,
        DocumentPreviewComponent
    ],
    exports: [
        MainPageDocumentsComponent
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
export class MainPageDocumentsModule { }
