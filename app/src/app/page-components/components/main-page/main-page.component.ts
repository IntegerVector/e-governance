import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DEFAULT_USER_ID } from 'src/app/shared/constants/shared.constants';

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
                    routerLink: '/main/academic-vacation',
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

            if (this.userId.toString() === DEFAULT_USER_ID) {
                this.setGuestLinks();
            } else {
                this.setSignedUserLinks();
            }
        });
    }

    public getQueryParams() {
        return {
            userId: this.userId
        };
    }

    private setGuestLinks(): void {
        this.links = [
            {
                routerLink: '/main/about',
                getQueryParams: this.getQueryParams.bind(this),
                title: 'About',
                childs: []
            }
        ];
    }

    private setSignedUserLinks(): void {
        this.links = [
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
                        routerLink: '/main/academic-vacation',
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
    }
}
