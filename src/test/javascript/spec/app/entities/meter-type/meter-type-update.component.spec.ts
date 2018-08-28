/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { HumbaTestModule } from '../../../test.module';
import { MeterTypeUpdateComponent } from 'app/entities/meter-type/meter-type-update.component';
import { MeterTypeService } from 'app/entities/meter-type/meter-type.service';
import { MeterType } from 'app/shared/model/meter-type.model';

describe('Component Tests', () => {
    describe('MeterType Management Update Component', () => {
        let comp: MeterTypeUpdateComponent;
        let fixture: ComponentFixture<MeterTypeUpdateComponent>;
        let service: MeterTypeService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HumbaTestModule],
                declarations: [MeterTypeUpdateComponent]
            })
                .overrideTemplate(MeterTypeUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MeterTypeUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MeterTypeService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new MeterType(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.meterType = entity;
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
                    const entity = new MeterType();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.meterType = entity;
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
