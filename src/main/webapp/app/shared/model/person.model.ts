import { IJob } from 'app/shared/model//job.model';

export interface IPerson {
    id?: number;
    foreNames?: string;
    surname?: string;
    email?: string;
    job?: IJob;
}

export class Person implements IPerson {
    constructor(public id?: number, public foreNames?: string, public surname?: string, public email?: string, public job?: IJob) {}
}
