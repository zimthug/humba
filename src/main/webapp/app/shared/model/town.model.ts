export interface ITown {
    id?: number;
    town?: string;
}

export class Town implements ITown {
    constructor(public id?: number, public town?: string) {}
}
