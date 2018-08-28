import { IMeterMake } from 'app/shared/model//meter-make.model';
import { IMeterType } from 'app/shared/model//meter-type.model';

export interface IMeterModel {
    id?: number;
    meterModel?: string;
    meterMake?: IMeterMake;
    meterType?: IMeterType;
}

export class MeterModel implements IMeterModel {
    constructor(public id?: number, public meterModel?: string, public meterMake?: IMeterMake, public meterType?: IMeterType) {}
}
