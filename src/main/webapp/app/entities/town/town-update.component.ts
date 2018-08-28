import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ITown } from 'app/shared/model/town.model';
import { TownService } from './town.service';

@Component({
    selector: 'jhi-town-update',
    templateUrl: './town-update.component.html'
})
export class TownUpdateComponent implements OnInit {
    private _town: ITown;
    isSaving: boolean;

    constructor(private townService: TownService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ town }) => {
            this.town = town;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.town.id !== undefined) {
            this.subscribeToSaveResponse(this.townService.update(this.town));
        } else {
            this.subscribeToSaveResponse(this.townService.create(this.town));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITown>>) {
        result.subscribe((res: HttpResponse<ITown>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get town() {
        return this._town;
    }

    set town(town: ITown) {
        this._town = town;
    }
}
