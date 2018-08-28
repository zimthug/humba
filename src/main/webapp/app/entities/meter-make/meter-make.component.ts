import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMeterMake } from 'app/shared/model/meter-make.model';
import { Principal } from 'app/core';
import { MeterMakeService } from './meter-make.service';

@Component({
    selector: 'jhi-meter-make',
    templateUrl: './meter-make.component.html'
})
export class MeterMakeComponent implements OnInit, OnDestroy {
    meterMakes: IMeterMake[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private meterMakeService: MeterMakeService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.meterMakeService.query().subscribe(
            (res: HttpResponse<IMeterMake[]>) => {
                this.meterMakes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInMeterMakes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IMeterMake) {
        return item.id;
    }

    registerChangeInMeterMakes() {
        this.eventSubscriber = this.eventManager.subscribe('meterMakeListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
