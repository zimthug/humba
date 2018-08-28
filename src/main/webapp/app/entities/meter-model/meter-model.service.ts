import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMeterModel } from 'app/shared/model/meter-model.model';

type EntityResponseType = HttpResponse<IMeterModel>;
type EntityArrayResponseType = HttpResponse<IMeterModel[]>;

@Injectable({ providedIn: 'root' })
export class MeterModelService {
    private resourceUrl = SERVER_API_URL + 'api/meter-models';

    constructor(private http: HttpClient) {}

    create(meterModel: IMeterModel): Observable<EntityResponseType> {
        return this.http.post<IMeterModel>(this.resourceUrl, meterModel, { observe: 'response' });
    }

    update(meterModel: IMeterModel): Observable<EntityResponseType> {
        return this.http.put<IMeterModel>(this.resourceUrl, meterModel, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IMeterModel>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IMeterModel[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
