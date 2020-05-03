import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { DataSourceService } from './services/data-source/data-source.service';
import { UrlParamsResolverService } from './services/url-params-resolver/url-params-resolver.service';
import { DataSaverService } from './services/data-saver/data-saver.service';
import { TextHandlerService } from './services/text-handler/text-handler.service';
import { TextHandlerPipe } from './pipes/text-handler/text-handler.pipe';
import { ProfilePictureComponent } from './components/profile-picture/profile-picture.component';

@NgModule({
    declarations: [
        TextHandlerPipe,
        ProfilePictureComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule
    ],
    exports: [
        TextHandlerPipe,
        ProfilePictureComponent
    ],
    providers: [
        DataSourceService,
        UrlParamsResolverService,
        DataSaverService,
        TextHandlerService
    ],
})
export class SharedModule { }
