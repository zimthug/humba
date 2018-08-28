export interface IMeterStatus {
    id?: number;
    meterStatus?: string;
    indInUse?: boolean;
}

export class MeterStatus implements IMeterStatus {
    constructor(public id?: number, public meterStatus?: string, public indInUse?: boolean) {
        this.indInUse = false;
    }
}
