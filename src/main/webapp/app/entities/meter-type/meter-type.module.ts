import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HumbaSharedModule } from 'app/shared';
import {
    MeterTypeComponent,
    MeterTypeDetailComponent,
    MeterTypeUpdateComponent,
    MeterTypeDeletePopupComponent,
    MeterTypeDeleteDialogComponent,
    meterTypeRoute,
    meterTypePopupRoute
} from './';

const ENTITY_STATES = [...meterTypeRoute, ...meterTypePopupRoute];

@NgModule({
    imports: [HumbaSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        MeterTypeComponent,
        MeterTypeDetailComponent,
        MeterTypeUpdateComponent,
        MeterTypeDeleteDialogComponent,
        MeterTypeDeletePopupComponent
    ],
    entryComponents: [MeterTypeComponent, MeterTypeUpdateComponent, MeterTypeDeleteDialogComponent, MeterTypeDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HumbaMeterTypeModule {}
