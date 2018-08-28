import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IMeter } from 'app/shared/model/meter.model';
import { MeterService } from './meter.service';
import { IMeterType } from 'app/shared/model/meter-type.model';
import { MeterTypeService } from 'app/entities/meter-type';
import { IMeterModel } from 'app/shared/model/meter-model.model';
import { MeterModelService } from 'app/entities/meter-model';
import { IWarehouse } from 'app/shared/model/warehouse.model';
import { WarehouseService } from 'app/entities/warehouse';
import { IMeterStatus } from 'app/shared/model/meter-status.model';
import { MeterStatusService } from 'app/entities/meter-status';

@Component({
    selector: 'jhi-meter-update',
    templateUrl: './meter-update.component.html'
})
export class MeterUpdateComponent implements OnInit {
    private _meter: IMeter;
    isSaving: boolean;

    metertypes: IMeterType[];

    metermodels: IMeterModel[];

    warehouses: IWarehouse[];

    meterstatuses: IMeterStatus[];
    dateManufacturedDp: any;
    statusDateDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private meterService: MeterService,
        private meterTypeService: MeterTypeService,
        private meterModelService: MeterModelService,
        private warehouseService: WarehouseService,
        private meterStatusService: MeterStatusService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ meter }) => {
            this.meter = meter;
        });
        this.meterTypeService.query().subscribe(
            (res: HttpResponse<IMeterType[]>) => {
                this.metertypes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.meterModelService.query().subscribe(
            (res: HttpResponse<IMeterModel[]>) => {
                this.metermodels = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.warehouseService.query().subscribe(
            (res: HttpResponse<IWarehouse[]>) => {
                this.warehouses = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.meterStatusService.query().subscribe(
            (res: HttpResponse<IMeterStatus[]>) => {
                this.meterstatuses = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.meter.id !== undefined) {
            this.subscribeToSaveResponse(this.meterService.update(this.meter));
        } else {
            this.subscribeToSaveResponse(this.meterService.create(this.meter));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IMeter>>) {
        result.subscribe((res: HttpResponse<IMeter>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackMeterTypeById(index: number, item: IMeterType) {
        return item.id;
    }

    trackMeterModelById(index: number, item: IMeterModel) {
        return item.id;
    }

    trackWarehouseById(index: number, item: IWarehouse) {
        return item.id;
    }

    trackMeterStatusById(index: number, item: IMeterStatus) {
        return item.id;
    }
    get meter() {
        return this._meter;
    }

    set meter(meter: IMeter) {
        this._meter = meter;
    }
}
