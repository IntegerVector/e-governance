import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ErrorHandlerService } from '../error/services/error-handler.service';
import { ErrorComponent } from './error.component';

@NgModule({
  declarations: [ErrorComponent],
  imports: [BrowserModule],
  exports: [ErrorComponent],
  providers: [ErrorHandlerService],
})
export class ErrorModule { }
