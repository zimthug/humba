import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IMeterStatus } from 'app/shared/model/meter-status.model';
import { MeterStatusService } from './meter-status.service';

@Component({
    selector: 'jhi-meter-status-update',
    templateUrl: './meter-status-update.component.html'
})
export class MeterStatusUpdateComponent implements OnInit {
    private _meterStatus: IMeterStatus;
    isSaving: boolean;

    constructor(private meterStatusService: MeterStatusService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ meterStatus }) => {
            this.meterStatus = meterStatus;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.meterStatus.id !== undefined) {
            this.subscribeToSaveResponse(this.meterStatusService.update(this.meterStatus));
        } else {
            this.subscribeToSaveResponse(this.meterStatusService.create(this.meterStatus));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IMeterStatus>>) {
        result.subscribe((res: HttpResponse<IMeterStatus>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get meterStatus() {
        return this._meterStatus;
    }

    set meterStatus(meterStatus: IMeterStatus) {
        this._meterStatus = meterStatus;
    }
}
