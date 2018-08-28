import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMeterMake } from 'app/shared/model/meter-make.model';

@Component({
    selector: 'jhi-meter-make-detail',
    templateUrl: './meter-make-detail.component.html'
})
export class MeterMakeDetailComponent implements OnInit {
    meterMake: IMeterMake;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ meterMake }) => {
            this.meterMake = meterMake;
        });
    }

    previousState() {
        window.history.back();
    }
}
