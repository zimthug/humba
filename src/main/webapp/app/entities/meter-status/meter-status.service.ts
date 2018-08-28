import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMeterStatus } from 'app/shared/model/meter-status.model';

type EntityResponseType = HttpResponse<IMeterStatus>;
type EntityArrayResponseType = HttpResponse<IMeterStatus[]>;

@Injectable({ providedIn: 'root' })
export class MeterStatusService {
    private resourceUrl = SERVER_API_URL + 'api/meter-statuses';

    constructor(private http: HttpClient) {}

    create(meterStatus: IMeterStatus): Observable<EntityResponseType> {
        return this.http.post<IMeterStatus>(this.resourceUrl, meterStatus, { observe: 'response' });
    }

    update(meterStatus: IMeterStatus): Observable<EntityResponseType> {
        return this.http.put<IMeterStatus>(this.resourceUrl, meterStatus, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IMeterStatus>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IMeterStatus[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
