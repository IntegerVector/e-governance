import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorObjectInterface } from 'src/app/shared/types/interfaces/error0bject.interface';


@Injectable({
    providedIn: 'root'
})
export class ErrorHandlerService {
    constructor(private router: Router) {}

    public navigateToErrPage(err: ErrorObjectInterface): void {
        this.router.navigate(['/error'], { queryParams: err });
    }
}
