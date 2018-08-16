import { NgModule } from '@angular/core';

import { HumbaSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [HumbaSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [HumbaSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class HumbaSharedCommonModule {}
