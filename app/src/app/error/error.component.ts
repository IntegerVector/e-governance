import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ErrorObjectInterface } from './types/error-object.interface';

@Component({
    selector: 'app-error',
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
    @Input() error: ErrorObjectInterface;

    constructor(
        private router: Router,
        private route: ActivatedRoute
    ) {}

    public ngOnInit(): void {
        this.route.data.subscribe(data => {
            this.error = {
                errCode: data.errCode,
                errMsg: data.errMsg,
                errTip: data.errTip
            };
        });
    }

    public navigateToMainPage(): void {
        this.router.navigate(['/']);
    }
}
