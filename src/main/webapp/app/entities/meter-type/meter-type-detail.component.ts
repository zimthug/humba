import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMeterType } from 'app/shared/model/meter-type.model';

@Component({
    selector: 'jhi-meter-type-detail',
    templateUrl: './meter-type-detail.component.html'
})
export class MeterTypeDetailComponent implements OnInit {
    meterType: IMeterType;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ meterType }) => {
            this.meterType = meterType;
        });
    }

    previousState() {
        window.history.back();
    }
}
