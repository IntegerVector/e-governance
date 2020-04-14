import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { DataSourceService } from './services/data-source/data-source.service';
import { UrlParamsResolverService } from './services/url-params-resolver/url-params-resolver.service';
import { DataSaverService } from './services/data-saver/data-saver.service';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    DataSourceService,
    UrlParamsResolverService,
    DataSaverService
  ],
})
export class SharedModule { }
