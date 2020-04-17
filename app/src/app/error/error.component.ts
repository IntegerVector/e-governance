import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ErrorObjectInterface } from './types/error-object.interface';
import { unknownErrorTip, unknownErrorMsg, goToMainPageButtonLabel, goToMainPageButtonTitle } from './error.constants';

@Component({
    selector: 'app-error',
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
    @Input() error: ErrorObjectInterface;
    public buttonLabel = goToMainPageButtonLabel;
    public buttonTitle = goToMainPageButtonTitle;

    constructor(
        private router: Router,
        private route: ActivatedRoute
    ) {}

    public ngOnInit(): void {
        this.route.data.subscribe(({ urlParams }) => {
            this.error = {
                errCode: urlParams.error.errCode || null,
                errMsg: urlParams.error.errMsg || unknownErrorMsg,
                errTip: urlParams.error.errTip || unknownErrorTip
            };
        });
    }

    public navigateToMainPage(): void {
        this.router.navigate(['/']);
    }
}
