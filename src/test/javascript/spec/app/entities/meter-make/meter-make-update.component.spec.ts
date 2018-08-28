/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { HumbaTestModule } from '../../../test.module';
import { MeterMakeUpdateComponent } from 'app/entities/meter-make/meter-make-update.component';
import { MeterMakeService } from 'app/entities/meter-make/meter-make.service';
import { MeterMake } from 'app/shared/model/meter-make.model';

describe('Component Tests', () => {
    describe('MeterMake Management Update Component', () => {
        let comp: MeterMakeUpdateComponent;
        let fixture: ComponentFixture<MeterMakeUpdateComponent>;
        let service: MeterMakeService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HumbaTestModule],
                declarations: [MeterMakeUpdateComponent]
            })
                .overrideTemplate(MeterMakeUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MeterMakeUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MeterMakeService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new MeterMake(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.meterMake = entity;
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
                    const entity = new MeterMake();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.meterMake = entity;
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
