import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMeterType } from 'app/shared/model/meter-type.model';

type EntityResponseType = HttpResponse<IMeterType>;
type EntityArrayResponseType = HttpResponse<IMeterType[]>;

@Injectable({ providedIn: 'root' })
export class MeterTypeService {
    private resourceUrl = SERVER_API_URL + 'api/meter-types';

    constructor(private http: HttpClient) {}

    create(meterType: IMeterType): Observable<EntityResponseType> {
        return this.http.post<IMeterType>(this.resourceUrl, meterType, { observe: 'response' });
    }

    update(meterType: IMeterType): Observable<EntityResponseType> {
        return this.http.put<IMeterType>(this.resourceUrl, meterType, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IMeterType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IMeterType[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
