import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMeterModel } from 'app/shared/model/meter-model.model';

@Component({
    selector: 'jhi-meter-model-detail',
    templateUrl: './meter-model-detail.component.html'
})
export class MeterModelDetailComponent implements OnInit {
    meterModel: IMeterModel;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ meterModel }) => {
            this.meterModel = meterModel;
        });
    }

    previousState() {
        window.history.back();
    }
}
