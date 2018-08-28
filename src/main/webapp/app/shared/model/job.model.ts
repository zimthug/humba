export interface IJob {
    id?: number;
    job?: string;
}

export class Job implements IJob {
    constructor(public id?: number, public job?: string) {}
}
