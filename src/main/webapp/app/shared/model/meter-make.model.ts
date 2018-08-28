export interface IMeterMake {
    id?: number;
    meterMake?: string;
}

export class MeterMake implements IMeterMake {
    constructor(public id?: number, public meterMake?: string) {}
}
