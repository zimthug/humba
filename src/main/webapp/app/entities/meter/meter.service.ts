import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMeter } from 'app/shared/model/meter.model';

type EntityResponseType = HttpResponse<IMeter>;
type EntityArrayResponseType = HttpResponse<IMeter[]>;

@Injectable({ providedIn: 'root' })
export class MeterService {
    private resourceUrl = SERVER_API_URL + 'api/meters';

    constructor(private http: HttpClient) {}

    create(meter: IMeter): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(meter);
        return this.http
            .post<IMeter>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(meter: IMeter): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(meter);
        return this.http
            .put<IMeter>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IMeter>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IMeter[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(meter: IMeter): IMeter {
        const copy: IMeter = Object.assign({}, meter, {
            dateManufactured:
                meter.dateManufactured != null && meter.dateManufactured.isValid() ? meter.dateManufactured.format(DATE_FORMAT) : null,
            statusDate: meter.statusDate != null && meter.statusDate.isValid() ? meter.statusDate.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.dateManufactured = res.body.dateManufactured != null ? moment(res.body.dateManufactured) : null;
        res.body.statusDate = res.body.statusDate != null ? moment(res.body.statusDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((meter: IMeter) => {
            meter.dateManufactured = meter.dateManufactured != null ? moment(meter.dateManufactured) : null;
            meter.statusDate = meter.statusDate != null ? moment(meter.statusDate) : null;
        });
        return res;
    }
}
