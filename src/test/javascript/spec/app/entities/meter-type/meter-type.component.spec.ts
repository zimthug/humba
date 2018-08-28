/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { HumbaTestModule } from '../../../test.module';
import { MeterTypeComponent } from 'app/entities/meter-type/meter-type.component';
import { MeterTypeService } from 'app/entities/meter-type/meter-type.service';
import { MeterType } from 'app/shared/model/meter-type.model';

describe('Component Tests', () => {
    describe('MeterType Management Component', () => {
        let comp: MeterTypeComponent;
        let fixture: ComponentFixture<MeterTypeComponent>;
        let service: MeterTypeService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HumbaTestModule],
                declarations: [MeterTypeComponent],
                providers: []
            })
                .overrideTemplate(MeterTypeComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MeterTypeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MeterTypeService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new MeterType(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.meterTypes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
