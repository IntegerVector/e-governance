import { NgModule } from '@angular/core';

import { ErrorHandlerService } from '../error/services/error-handler.service';
import { ErrorComponent } from './error.component';

@NgModule({
  declarations: [ErrorComponent],
  imports: [],
  exports: [ErrorComponent],
  providers: [ErrorHandlerService],
})
export class ErrorModule { }
