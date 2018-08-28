import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HumbaSharedModule } from 'app/shared';
import {
    MeterStatusComponent,
    MeterStatusDetailComponent,
    MeterStatusUpdateComponent,
    MeterStatusDeletePopupComponent,
    MeterStatusDeleteDialogComponent,
    meterStatusRoute,
    meterStatusPopupRoute
} from './';

const ENTITY_STATES = [...meterStatusRoute, ...meterStatusPopupRoute];

@NgModule({
    imports: [HumbaSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        MeterStatusComponent,
        MeterStatusDetailComponent,
        MeterStatusUpdateComponent,
        MeterStatusDeleteDialogComponent,
        MeterStatusDeletePopupComponent
    ],
    entryComponents: [MeterStatusComponent, MeterStatusUpdateComponent, MeterStatusDeleteDialogComponent, MeterStatusDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HumbaMeterStatusModule {}
