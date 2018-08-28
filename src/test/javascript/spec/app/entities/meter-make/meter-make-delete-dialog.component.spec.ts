/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { HumbaTestModule } from '../../../test.module';
import { MeterMakeDeleteDialogComponent } from 'app/entities/meter-make/meter-make-delete-dialog.component';
import { MeterMakeService } from 'app/entities/meter-make/meter-make.service';

describe('Component Tests', () => {
    describe('MeterMake Management Delete Component', () => {
        let comp: MeterMakeDeleteDialogComponent;
        let fixture: ComponentFixture<MeterMakeDeleteDialogComponent>;
        let service: MeterMakeService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HumbaTestModule],
                declarations: [MeterMakeDeleteDialogComponent]
            })
                .overrideTemplate(MeterMakeDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MeterMakeDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MeterMakeService);
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
