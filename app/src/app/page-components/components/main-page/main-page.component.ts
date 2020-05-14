import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
    public userId: string;

    public links = [
        {
            routerLink: '/main/about',
            getQueryParams: this.getQueryParams.bind(this),
            title: 'About',
            childs: []
        },
        {
            routerLink: '/main/waiting-documents',
            getQueryParams: this.getQueryParams.bind(this),
            title: 'Waiting documents',
            childs: []
        },
        {
            routerLink: '/main/complited-documents',
            getQueryParams: this.getQueryParams.bind(this),
            title: 'Complited documents',
            childs: []
        },
        {
            routerLink: null,
            getQueryParams: () => null,
            title: null,
            childs: [
                {
                    routerLink: '/main/about',
                    getQueryParams: this.getQueryParams.bind(this),
                    title: 'Academic Vacation'
                },
                {
                    routerLink: '/main/about',
                    getQueryParams: this.getQueryParams.bind(this),
                    title: 'Get average mark'
                }
            ]
        }
    ];

    constructor(private route: ActivatedRoute) {}

    public ngOnInit(): void {
        this.route.data.subscribe(({ urlParams }) => {
            this.userId = urlParams.userId;
        });
    }

    public getQueryParams() {
        return {
            userId: this.userId
        };
    }
}
