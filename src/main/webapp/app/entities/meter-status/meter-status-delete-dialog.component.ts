import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMeterStatus } from 'app/shared/model/meter-status.model';
import { MeterStatusService } from './meter-status.service';

@Component({
    selector: 'jhi-meter-status-delete-dialog',
    templateUrl: './meter-status-delete-dialog.component.html'
})
export class MeterStatusDeleteDialogComponent {
    meterStatus: IMeterStatus;

    constructor(
        private meterStatusService: MeterStatusService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.meterStatusService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'meterStatusListModification',
                content: 'Deleted an meterStatus'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-meter-status-delete-popup',
    template: ''
})
export class MeterStatusDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ meterStatus }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(MeterStatusDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.meterStatus = meterStatus;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
