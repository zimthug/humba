import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMeterMake } from 'app/shared/model/meter-make.model';
import { MeterMakeService } from './meter-make.service';

@Component({
    selector: 'jhi-meter-make-delete-dialog',
    templateUrl: './meter-make-delete-dialog.component.html'
})
export class MeterMakeDeleteDialogComponent {
    meterMake: IMeterMake;

    constructor(private meterMakeService: MeterMakeService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.meterMakeService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'meterMakeListModification',
                content: 'Deleted an meterMake'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-meter-make-delete-popup',
    template: ''
})
export class MeterMakeDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ meterMake }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(MeterMakeDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.meterMake = meterMake;
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
