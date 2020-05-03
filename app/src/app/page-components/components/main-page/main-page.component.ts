import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
    public userId: string;

    constructor(private route: ActivatedRoute) {}

    public ngOnInit(): void {
        this.route.data.subscribe(({ urlParams }) => {
            this.userId = urlParams.userId;
        });
    }
}
