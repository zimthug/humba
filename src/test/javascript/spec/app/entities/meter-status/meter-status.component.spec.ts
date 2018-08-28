/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { HumbaTestModule } from '../../../test.module';
import { MeterStatusComponent } from 'app/entities/meter-status/meter-status.component';
import { MeterStatusService } from 'app/entities/meter-status/meter-status.service';
import { MeterStatus } from 'app/shared/model/meter-status.model';

describe('Component Tests', () => {
    describe('MeterStatus Management Component', () => {
        let comp: MeterStatusComponent;
        let fixture: ComponentFixture<MeterStatusComponent>;
        let service: MeterStatusService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HumbaTestModule],
                declarations: [MeterStatusComponent],
                providers: []
            })
                .overrideTemplate(MeterStatusComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MeterStatusComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MeterStatusService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new MeterStatus(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.meterStatuses[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
