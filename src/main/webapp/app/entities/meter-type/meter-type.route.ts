import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { MeterType } from 'app/shared/model/meter-type.model';
import { MeterTypeService } from './meter-type.service';
import { MeterTypeComponent } from './meter-type.component';
import { MeterTypeDetailComponent } from './meter-type-detail.component';
import { MeterTypeUpdateComponent } from './meter-type-update.component';
import { MeterTypeDeletePopupComponent } from './meter-type-delete-dialog.component';
import { IMeterType } from 'app/shared/model/meter-type.model';

@Injectable({ providedIn: 'root' })
export class MeterTypeResolve implements Resolve<IMeterType> {
    constructor(private service: MeterTypeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((meterType: HttpResponse<MeterType>) => meterType.body));
        }
        return of(new MeterType());
    }
}

export const meterTypeRoute: Routes = [
    {
        path: 'meter-type',
        component: MeterTypeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MeterTypes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'meter-type/:id/view',
        component: MeterTypeDetailComponent,
        resolve: {
            meterType: MeterTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MeterTypes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'meter-type/new',
        component: MeterTypeUpdateComponent,
        resolve: {
            meterType: MeterTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MeterTypes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'meter-type/:id/edit',
        component: MeterTypeUpdateComponent,
        resolve: {
            meterType: MeterTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MeterTypes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const meterTypePopupRoute: Routes = [
    {
        path: 'meter-type/:id/delete',
        component: MeterTypeDeletePopupComponent,
        resolve: {
            meterType: MeterTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MeterTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
