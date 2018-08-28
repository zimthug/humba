import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMeterStatus } from 'app/shared/model/meter-status.model';

@Component({
    selector: 'jhi-meter-status-detail',
    templateUrl: './meter-status-detail.component.html'
})
export class MeterStatusDetailComponent implements OnInit {
    meterStatus: IMeterStatus;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ meterStatus }) => {
            this.meterStatus = meterStatus;
        });
    }

    previousState() {
        window.history.back();
    }
}
