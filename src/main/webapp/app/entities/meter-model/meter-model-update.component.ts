import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IMeterModel } from 'app/shared/model/meter-model.model';
import { MeterModelService } from './meter-model.service';
import { IMeterMake } from 'app/shared/model/meter-make.model';
import { MeterMakeService } from 'app/entities/meter-make';
import { IMeterType } from 'app/shared/model/meter-type.model';
import { MeterTypeService } from 'app/entities/meter-type';

@Component({
    selector: 'jhi-meter-model-update',
    templateUrl: './meter-model-update.component.html'
})
export class MeterModelUpdateComponent implements OnInit {
    private _meterModel: IMeterModel;
    isSaving: boolean;

    metermakes: IMeterMake[];

    metertypes: IMeterType[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private meterModelService: MeterModelService,
        private meterMakeService: MeterMakeService,
        private meterTypeService: MeterTypeService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ meterModel }) => {
            this.meterModel = meterModel;
        });
        this.meterMakeService.query().subscribe(
            (res: HttpResponse<IMeterMake[]>) => {
                this.metermakes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.meterTypeService.query().subscribe(
            (res: HttpResponse<IMeterType[]>) => {
                this.metertypes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.meterModel.id !== undefined) {
            this.subscribeToSaveResponse(this.meterModelService.update(this.meterModel));
        } else {
            this.subscribeToSaveResponse(this.meterModelService.create(this.meterModel));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IMeterModel>>) {
        result.subscribe((res: HttpResponse<IMeterModel>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackMeterMakeById(index: number, item: IMeterMake) {
        return item.id;
    }

    trackMeterTypeById(index: number, item: IMeterType) {
        return item.id;
    }
    get meterModel() {
        return this._meterModel;
    }

    set meterModel(meterModel: IMeterModel) {
        this._meterModel = meterModel;
    }
}
