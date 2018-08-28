/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { HumbaTestModule } from '../../../test.module';
import { MeterModelComponent } from 'app/entities/meter-model/meter-model.component';
import { MeterModelService } from 'app/entities/meter-model/meter-model.service';
import { MeterModel } from 'app/shared/model/meter-model.model';

describe('Component Tests', () => {
    describe('MeterModel Management Component', () => {
        let comp: MeterModelComponent;
        let fixture: ComponentFixture<MeterModelComponent>;
        let service: MeterModelService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HumbaTestModule],
                declarations: [MeterModelComponent],
                providers: []
            })
                .overrideTemplate(MeterModelComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MeterModelComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MeterModelService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new MeterModel(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.meterModels[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
