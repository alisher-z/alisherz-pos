import { Injectable } from "@angular/core";
import { FieldTree } from "@angular/forms/signals";
import { FilterBluePrint } from "../../../elements/frames/filter/utils/filter.blueprint";

@Injectable()
export class CustomerFilterStructure extends FilterBluePrint<CustomerFilterFields> {
    override form!: FieldTree<CustomerFilterFields, string | number>;
    override fields = [
        { label: 'Name', field: 'name' },
        { label: 'Phone', field: 'phone' },
        { label: 'Email', field: 'email' },
        { label: 'ID', field: 'id' },
        { label: 'Address', field: 'address' },
        { label: 'Notes', field: 'notes' }
    ];

    override getInitData() {
        return { id: [], name: [], phone: [], email: [], address: [], notes: [] }
    }
}


export interface CustomerFilterFields {
    id: string[];
    name: string[];
    phone: string[];
    email: string[];
    address: string[];
    notes: string[];
}