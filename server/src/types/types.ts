import { Pool } from "pg";
export { DBQueryError, DBQueryResult, DBResult } from "../db/utils/result.db";

export interface Role {
    role: Pool;
    user: string;
}

export interface iParty {
    pk: string;
    id?: string;
    phone?: string;
    email?: string;
    address?: string;
    notes?: string;
    active: boolean;
}

export interface iCustomer extends iParty { }

export interface iBrand {
    pk: string;
    name: string;
    notes?: string;
    active: boolean;
}

export interface iProductType {
    pk: string;
    name: string;
    notes?: string;
    active: boolean;
}

export interface iProductSelf {
    pk: string;
    barcode?: string;
    name: string;
    type: iProductType;
    brand: iBrand;
    serial?: string;
    model?: string;
    note?: string;
}

export interface iProductPriceHistory {
    pk: string;
    product: iProductSelf;
    amount: number;
    notes?: string;
}

export interface iOutflow {
    pk: string;
    id?: string;
    date: string;
    notes?: string;
    customer: iCustomer;
}

export interface iOutflowItem {
    pk: string;
    quantity: number;
    notes?: string;
    product: iProductSelf;
    price: iProductPriceHistory;
}

export interface iProductOutflowItem extends iOutflowItem {
    outflow: iProductOutflow;
}

export interface iProductOutflow extends iOutflow {
    items: [iProductOutflowItem];
}

export interface iInflow {
    pk: string;
    id?: string;
    date: string;
    notes?: string;
    customer: iCustomer;
}

export interface iInflowDetail {
    pk: string;
    notes?: string;
    amount: number;
    discount: number;
    outflow: iProductOutflow;
}

export interface iProductInflow extends iInflow {
    details: [iProductInflowDetail];
}

export interface iProductInflowDetail extends iInflowDetail {
    inflow: iProductInflow;
}

export interface iVednor extends iParty { }

export interface iProductInventory {
    pk: string;
    date: string;
    id?: string;
    notes?: string;
    vendor: iVednor;
    items: [iProductInventoryItem]
}

export interface iProductInventoryItem {
    pk: string;
    cost: number;
    quantity: number;
    notes?: string;
    product: iProductSelf;
    inventory: iProductInventory;
}

export interface iDevice {
    pk: string;
    model?: string;
    serial?: string;
    notes?: string;
    brand: iBrand;
    customer: iCustomer;
}

export interface iTicket {
    pk: string;
    id?: string;
    date: string;
    problem?: string;
    estimated: string;
    device: iDevice;
}

export interface iServiceSelf {
    pk: string;
    id?: string;
    name: string;
    notes?: string;
}

export interface iServicePriceHistory {
    pk: string;
    amount: number;
    service: iServiceSelf
}

export interface iRepairService {
    pk: string;
    duration: string;
    notes?: string;
    price: iServicePriceHistory;
    outflow: iRepairOutflow;
    service: iServiceSelf;
}

export interface iRepairOutflow {
    ticket: string;
    items: [iProductOutflowItem];
}

export interface iRepairInflowDetail extends iInflowDetail {
    inflow: iRepairInflow;
}

export interface iRepairInflow extends iInflow {
    details: [iRepairInflowDetail];
}