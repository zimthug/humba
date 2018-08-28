import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HumbaSharedModule } from 'app/shared';
import {
    MeterModelComponent,
    MeterModelDetailComponent,
    MeterModelUpdateComponent,
    MeterModelDeletePopupComponent,
    MeterModelDeleteDialogComponent,
    meterModelRoute,
    meterModelPopupRoute
} from './';

const ENTITY_STATES = [...meterModelRoute, ...meterModelPopupRoute];

@NgModule({
    imports: [HumbaSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        MeterModelComponent,
        MeterModelDetailComponent,
        MeterModelUpdateComponent,
        MeterModelDeleteDialogComponent,
        MeterModelDeletePopupComponent
    ],
    entryComponents: [MeterModelComponent, MeterModelUpdateComponent, MeterModelDeleteDialogComponent, MeterModelDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HumbaMeterModelModule {}
