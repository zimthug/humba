/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { HumbaTestModule } from '../../../test.module';
import { MeterStatusUpdateComponent } from 'app/entities/meter-status/meter-status-update.component';
import { MeterStatusService } from 'app/entities/meter-status/meter-status.service';
import { MeterStatus } from 'app/shared/model/meter-status.model';

describe('Component Tests', () => {
    describe('MeterStatus Management Update Component', () => {
        let comp: MeterStatusUpdateComponent;
        let fixture: ComponentFixture<MeterStatusUpdateComponent>;
        let service: MeterStatusService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HumbaTestModule],
                declarations: [MeterStatusUpdateComponent]
            })
                .overrideTemplate(MeterStatusUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MeterStatusUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MeterStatusService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new MeterStatus(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.meterStatus = entity;
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
                    const entity = new MeterStatus();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.meterStatus = entity;
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
