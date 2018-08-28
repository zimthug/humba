import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { MeterStatus } from 'app/shared/model/meter-status.model';
import { MeterStatusService } from './meter-status.service';
import { MeterStatusComponent } from './meter-status.component';
import { MeterStatusDetailComponent } from './meter-status-detail.component';
import { MeterStatusUpdateComponent } from './meter-status-update.component';
import { MeterStatusDeletePopupComponent } from './meter-status-delete-dialog.component';
import { IMeterStatus } from 'app/shared/model/meter-status.model';

@Injectable({ providedIn: 'root' })
export class MeterStatusResolve implements Resolve<IMeterStatus> {
    constructor(private service: MeterStatusService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((meterStatus: HttpResponse<MeterStatus>) => meterStatus.body));
        }
        return of(new MeterStatus());
    }
}

export const meterStatusRoute: Routes = [
    {
        path: 'meter-status',
        component: MeterStatusComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MeterStatuses'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'meter-status/:id/view',
        component: MeterStatusDetailComponent,
        resolve: {
            meterStatus: MeterStatusResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MeterStatuses'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'meter-status/new',
        component: MeterStatusUpdateComponent,
        resolve: {
            meterStatus: MeterStatusResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MeterStatuses'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'meter-status/:id/edit',
        component: MeterStatusUpdateComponent,
        resolve: {
            meterStatus: MeterStatusResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MeterStatuses'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const meterStatusPopupRoute: Routes = [
    {
        path: 'meter-status/:id/delete',
        component: MeterStatusDeletePopupComponent,
        resolve: {
            meterStatus: MeterStatusResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MeterStatuses'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
