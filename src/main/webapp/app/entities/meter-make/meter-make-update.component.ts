import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IMeterMake } from 'app/shared/model/meter-make.model';
import { MeterMakeService } from './meter-make.service';

@Component({
    selector: 'jhi-meter-make-update',
    templateUrl: './meter-make-update.component.html'
})
export class MeterMakeUpdateComponent implements OnInit {
    private _meterMake: IMeterMake;
    isSaving: boolean;

    constructor(private meterMakeService: MeterMakeService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ meterMake }) => {
            this.meterMake = meterMake;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.meterMake.id !== undefined) {
            this.subscribeToSaveResponse(this.meterMakeService.update(this.meterMake));
        } else {
            this.subscribeToSaveResponse(this.meterMakeService.create(this.meterMake));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IMeterMake>>) {
        result.subscribe((res: HttpResponse<IMeterMake>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get meterMake() {
        return this._meterMake;
    }

    set meterMake(meterMake: IMeterMake) {
        this._meterMake = meterMake;
    }
}
