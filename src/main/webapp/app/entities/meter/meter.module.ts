import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HumbaSharedModule } from 'app/shared';
import {
    MeterComponent,
    MeterDetailComponent,
    MeterUpdateComponent,
    MeterDeletePopupComponent,
    MeterDeleteDialogComponent,
    meterRoute,
    meterPopupRoute
} from './';

const ENTITY_STATES = [...meterRoute, ...meterPopupRoute];

@NgModule({
    imports: [HumbaSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [MeterComponent, MeterDetailComponent, MeterUpdateComponent, MeterDeleteDialogComponent, MeterDeletePopupComponent],
    entryComponents: [MeterComponent, MeterUpdateComponent, MeterDeleteDialogComponent, MeterDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HumbaMeterModule {}
