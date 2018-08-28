import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { MeterMake } from 'app/shared/model/meter-make.model';
import { MeterMakeService } from './meter-make.service';
import { MeterMakeComponent } from './meter-make.component';
import { MeterMakeDetailComponent } from './meter-make-detail.component';
import { MeterMakeUpdateComponent } from './meter-make-update.component';
import { MeterMakeDeletePopupComponent } from './meter-make-delete-dialog.component';
import { IMeterMake } from 'app/shared/model/meter-make.model';

@Injectable({ providedIn: 'root' })
export class MeterMakeResolve implements Resolve<IMeterMake> {
    constructor(private service: MeterMakeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((meterMake: HttpResponse<MeterMake>) => meterMake.body));
        }
        return of(new MeterMake());
    }
}

export const meterMakeRoute: Routes = [
    {
        path: 'meter-make',
        component: MeterMakeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MeterMakes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'meter-make/:id/view',
        component: MeterMakeDetailComponent,
        resolve: {
            meterMake: MeterMakeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MeterMakes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'meter-make/new',
        component: MeterMakeUpdateComponent,
        resolve: {
            meterMake: MeterMakeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MeterMakes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'meter-make/:id/edit',
        component: MeterMakeUpdateComponent,
        resolve: {
            meterMake: MeterMakeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MeterMakes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const meterMakePopupRoute: Routes = [
    {
        path: 'meter-make/:id/delete',
        component: MeterMakeDeletePopupComponent,
        resolve: {
            meterMake: MeterMakeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MeterMakes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
