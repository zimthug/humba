/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { HumbaTestModule } from '../../../test.module';
import { MeterMakeComponent } from 'app/entities/meter-make/meter-make.component';
import { MeterMakeService } from 'app/entities/meter-make/meter-make.service';
import { MeterMake } from 'app/shared/model/meter-make.model';

describe('Component Tests', () => {
    describe('MeterMake Management Component', () => {
        let comp: MeterMakeComponent;
        let fixture: ComponentFixture<MeterMakeComponent>;
        let service: MeterMakeService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HumbaTestModule],
                declarations: [MeterMakeComponent],
                providers: []
            })
                .overrideTemplate(MeterMakeComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MeterMakeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MeterMakeService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new MeterMake(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.meterMakes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
