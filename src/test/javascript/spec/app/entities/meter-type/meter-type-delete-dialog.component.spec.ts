/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { HumbaTestModule } from '../../../test.module';
import { MeterTypeDeleteDialogComponent } from 'app/entities/meter-type/meter-type-delete-dialog.component';
import { MeterTypeService } from 'app/entities/meter-type/meter-type.service';

describe('Component Tests', () => {
    describe('MeterType Management Delete Component', () => {
        let comp: MeterTypeDeleteDialogComponent;
        let fixture: ComponentFixture<MeterTypeDeleteDialogComponent>;
        let service: MeterTypeService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HumbaTestModule],
                declarations: [MeterTypeDeleteDialogComponent]
            })
                .overrideTemplate(MeterTypeDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MeterTypeDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MeterTypeService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
