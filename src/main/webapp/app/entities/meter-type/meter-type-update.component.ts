import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IMeterType } from 'app/shared/model/meter-type.model';
import { MeterTypeService } from './meter-type.service';

@Component({
    selector: 'jhi-meter-type-update',
    templateUrl: './meter-type-update.component.html'
})
export class MeterTypeUpdateComponent implements OnInit {
    private _meterType: IMeterType;
    isSaving: boolean;

    constructor(private meterTypeService: MeterTypeService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ meterType }) => {
            this.meterType = meterType;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.meterType.id !== undefined) {
            this.subscribeToSaveResponse(this.meterTypeService.update(this.meterType));
        } else {
            this.subscribeToSaveResponse(this.meterTypeService.create(this.meterType));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IMeterType>>) {
        result.subscribe((res: HttpResponse<IMeterType>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get meterType() {
        return this._meterType;
    }

    set meterType(meterType: IMeterType) {
        this._meterType = meterType;
    }
}
