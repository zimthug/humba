import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { MeterModel } from 'app/shared/model/meter-model.model';
import { MeterModelService } from './meter-model.service';
import { MeterModelComponent } from './meter-model.component';
import { MeterModelDetailComponent } from './meter-model-detail.component';
import { MeterModelUpdateComponent } from './meter-model-update.component';
import { MeterModelDeletePopupComponent } from './meter-model-delete-dialog.component';
import { IMeterModel } from 'app/shared/model/meter-model.model';

@Injectable({ providedIn: 'root' })
export class MeterModelResolve implements Resolve<IMeterModel> {
    constructor(private service: MeterModelService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((meterModel: HttpResponse<MeterModel>) => meterModel.body));
        }
        return of(new MeterModel());
    }
}

export const meterModelRoute: Routes = [
    {
        path: 'meter-model',
        component: MeterModelComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MeterModels'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'meter-model/:id/view',
        component: MeterModelDetailComponent,
        resolve: {
            meterModel: MeterModelResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MeterModels'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'meter-model/new',
        component: MeterModelUpdateComponent,
        resolve: {
            meterModel: MeterModelResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MeterModels'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'meter-model/:id/edit',
        component: MeterModelUpdateComponent,
        resolve: {
            meterModel: MeterModelResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MeterModels'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const meterModelPopupRoute: Routes = [
    {
        path: 'meter-model/:id/delete',
        component: MeterModelDeletePopupComponent,
        resolve: {
            meterModel: MeterModelResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MeterModels'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
