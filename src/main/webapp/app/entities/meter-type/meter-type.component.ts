import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMeterType } from 'app/shared/model/meter-type.model';
import { Principal } from 'app/core';
import { MeterTypeService } from './meter-type.service';

@Component({
    selector: 'jhi-meter-type',
    templateUrl: './meter-type.component.html'
})
export class MeterTypeComponent implements OnInit, OnDestroy {
    meterTypes: IMeterType[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private meterTypeService: MeterTypeService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.meterTypeService.query().subscribe(
            (res: HttpResponse<IMeterType[]>) => {
                this.meterTypes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInMeterTypes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IMeterType) {
        return item.id;
    }

    registerChangeInMeterTypes() {
        this.eventSubscriber = this.eventManager.subscribe('meterTypeListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
