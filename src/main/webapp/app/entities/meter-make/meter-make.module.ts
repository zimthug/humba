import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HumbaSharedModule } from 'app/shared';
import {
    MeterMakeComponent,
    MeterMakeDetailComponent,
    MeterMakeUpdateComponent,
    MeterMakeDeletePopupComponent,
    MeterMakeDeleteDialogComponent,
    meterMakeRoute,
    meterMakePopupRoute
} from './';

const ENTITY_STATES = [...meterMakeRoute, ...meterMakePopupRoute];

@NgModule({
    imports: [HumbaSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        MeterMakeComponent,
        MeterMakeDetailComponent,
        MeterMakeUpdateComponent,
        MeterMakeDeleteDialogComponent,
        MeterMakeDeletePopupComponent
    ],
    entryComponents: [MeterMakeComponent, MeterMakeUpdateComponent, MeterMakeDeleteDialogComponent, MeterMakeDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HumbaMeterMakeModule {}
