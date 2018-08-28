import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { HumbaTownModule } from './town/town.module';
import { HumbaJobModule } from './job/job.module';
import { HumbaPersonModule } from './person/person.module';
import { HumbaWarehouseModule } from './warehouse/warehouse.module';
import { HumbaMeterMakeModule } from './meter-make/meter-make.module';
import { HumbaMeterModelModule } from './meter-model/meter-model.module';
import { HumbaMeterTypeModule } from './meter-type/meter-type.module';
import { HumbaMeterStatusModule } from './meter-status/meter-status.module';
import { HumbaMeterModule } from './meter/meter.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        HumbaTownModule,
        HumbaJobModule,
        HumbaPersonModule,
        HumbaWarehouseModule,
        HumbaMeterMakeModule,
        HumbaMeterModelModule,
        HumbaMeterTypeModule,
        HumbaMeterStatusModule,
        HumbaMeterModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HumbaEntityModule {}
