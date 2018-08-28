import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMeterMake } from 'app/shared/model/meter-make.model';

type EntityResponseType = HttpResponse<IMeterMake>;
type EntityArrayResponseType = HttpResponse<IMeterMake[]>;

@Injectable({ providedIn: 'root' })
export class MeterMakeService {
    private resourceUrl = SERVER_API_URL + 'api/meter-makes';

    constructor(private http: HttpClient) {}

    create(meterMake: IMeterMake): Observable<EntityResponseType> {
        return this.http.post<IMeterMake>(this.resourceUrl, meterMake, { observe: 'response' });
    }

    update(meterMake: IMeterMake): Observable<EntityResponseType> {
        return this.http.put<IMeterMake>(this.resourceUrl, meterMake, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IMeterMake>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IMeterMake[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
