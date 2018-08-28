import { Moment } from 'moment';
import { IMeterType } from 'app/shared/model//meter-type.model';
import { IMeterModel } from 'app/shared/model//meter-model.model';
import { IWarehouse } from 'app/shared/model//warehouse.model';
import { IMeterStatus } from 'app/shared/model//meter-status.model';

export const enum Owner {
    COMPANY = 'COMPANY',
    INDIVIDUAL = 'INDIVIDUAL'
}

export interface IMeter {
    id?: number;
    meter?: string;
    dateManufactured?: Moment;
    statusDate?: Moment;
    owner?: Owner;
    meterType?: IMeterType;
    meterModel?: IMeterModel;
    warehouse?: IWarehouse;
    meterStatus?: IMeterStatus;
}

export class Meter implements IMeter {
    constructor(
        public id?: number,
        public meter?: string,
        public dateManufactured?: Moment,
        public statusDate?: Moment,
        public owner?: Owner,
        public meterType?: IMeterType,
        public meterModel?: IMeterModel,
        public warehouse?: IWarehouse,
        public meterStatus?: IMeterStatus
    ) {}
}
