import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMeter } from 'app/shared/model/meter.model';

@Component({
    selector: 'jhi-meter-detail',
    templateUrl: './meter-detail.component.html'
})
export class MeterDetailComponent implements OnInit {
    meter: IMeter;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ meter }) => {
            this.meter = meter;
        });
    }

    previousState() {
        window.history.back();
    }
}
