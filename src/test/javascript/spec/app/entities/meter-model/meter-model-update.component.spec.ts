/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { HumbaTestModule } from '../../../test.module';
import { MeterModelUpdateComponent } from 'app/entities/meter-model/meter-model-update.component';
import { MeterModelService } from 'app/entities/meter-model/meter-model.service';
import { MeterModel } from 'app/shared/model/meter-model.model';

describe('Component Tests', () => {
    describe('MeterModel Management Update Component', () => {
        let comp: MeterModelUpdateComponent;
        let fixture: ComponentFixture<MeterModelUpdateComponent>;
        let service: MeterModelService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HumbaTestModule],
                declarations: [MeterModelUpdateComponent]
            })
                .overrideTemplate(MeterModelUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MeterModelUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MeterModelService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new MeterModel(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.meterModel = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new MeterModel();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.meterModel = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
