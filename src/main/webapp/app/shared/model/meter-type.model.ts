export interface IMeterType {
    id?: number;
    meterType?: string;
}

export class MeterType implements IMeterType {
    constructor(public id?: number, public meterType?: string) {}
}
