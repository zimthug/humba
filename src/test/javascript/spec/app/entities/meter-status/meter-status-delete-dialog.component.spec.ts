/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { HumbaTestModule } from '../../../test.module';
import { MeterStatusDeleteDialogComponent } from 'app/entities/meter-status/meter-status-delete-dialog.component';
import { MeterStatusService } from 'app/entities/meter-status/meter-status.service';

describe('Component Tests', () => {
    describe('MeterStatus Management Delete Component', () => {
        let comp: MeterStatusDeleteDialogComponent;
        let fixture: ComponentFixture<MeterStatusDeleteDialogComponent>;
        let service: MeterStatusService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HumbaTestModule],
                declarations: [MeterStatusDeleteDialogComponent]
            })
                .overrideTemplate(MeterStatusDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MeterStatusDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MeterStatusService);
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
