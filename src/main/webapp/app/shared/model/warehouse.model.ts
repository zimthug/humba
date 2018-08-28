import { ITown } from 'app/shared/model//town.model';
import { IPerson } from 'app/shared/model//person.model';

export const enum WarehouseStatus {
    NEW = 'NEW',
    NORMAL = 'NORMAL',
    CANCELLED = 'CANCELLED'
}

export interface IWarehouse {
    id?: number;
    warehouse?: string;
    code?: string;
    address?: string;
    street?: string;
    status?: WarehouseStatus;
    town?: ITown;
    person?: IPerson;
}

export class Warehouse implements IWarehouse {
    constructor(
        public id?: number,
        public warehouse?: string,
        public code?: string,
        public address?: string,
        public street?: string,
        public status?: WarehouseStatus,
        public town?: ITown,
        public person?: IPerson
    ) {}
}
