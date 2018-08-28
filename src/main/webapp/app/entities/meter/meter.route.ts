import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Meter } from 'app/shared/model/meter.model';
import { MeterService } from './meter.service';
import { MeterComponent } from './meter.component';
import { MeterDetailComponent } from './meter-detail.component';
import { MeterUpdateComponent } from './meter-update.component';
import { MeterDeletePopupComponent } from './meter-delete-dialog.component';
import { IMeter } from 'app/shared/model/meter.model';

@Injectable({ providedIn: 'root' })
export class MeterResolve implements Resolve<IMeter> {
    constructor(private service: MeterService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((meter: HttpResponse<Meter>) => meter.body));
        }
        return of(new Meter());
    }
}

export const meterRoute: Routes = [
    {
        path: 'meter',
        component: MeterComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'Meters'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'meter/:id/view',
        component: MeterDetailComponent,
        resolve: {
            meter: MeterResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Meters'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'meter/new',
        component: MeterUpdateComponent,
        resolve: {
            meter: MeterResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Meters'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'meter/:id/edit',
        component: MeterUpdateComponent,
        resolve: {
            meter: MeterResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Meters'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const meterPopupRoute: Routes = [
    {
        path: 'meter/:id/delete',
        component: MeterDeletePopupComponent,
        resolve: {
            meter: MeterResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Meters'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
