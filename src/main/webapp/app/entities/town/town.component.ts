import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITown } from 'app/shared/model/town.model';
import { Principal } from 'app/core';
import { TownService } from './town.service';

@Component({
    selector: 'jhi-town',
    templateUrl: './town.component.html'
})
export class TownComponent implements OnInit, OnDestroy {
    towns: ITown[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private townService: TownService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.townService.query().subscribe(
            (res: HttpResponse<ITown[]>) => {
                this.towns = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInTowns();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITown) {
        return item.id;
    }

    registerChangeInTowns() {
        this.eventSubscriber = this.eventManager.subscribe('townListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
