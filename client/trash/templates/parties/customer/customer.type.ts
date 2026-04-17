import { required, schema } from "@angular/forms/signals";
import { email } from "../../../../utils/custome-validations/email";
import { maxLength } from "../../../../utils/custome-validations/max.length";
import { formCommonInitialData } from "../../common.type";

export interface iCustomer {
    pk: string;
    id: string | null;
    name: string;
    phone: string | null;
    email: string | null;
    address: string | null;
    notes: string | null;
    active: boolean;
    isNew: boolean;
}

export const initialData: iCustomer = {
    ...formCommonInitialData(),
    id: null,
    name: '',
    phone: null,
    email: null,
    address: null,
    notes: null,
    active: true
};

export const schemaz = schema<iCustomer>(p => {
    required(p.pk);
    maxLength(p.id, 100, { message: 'Customer ID must note exceed above 100 characters!' });
    required(p.name, { message: 'Customer name is a required field!' });
    maxLength(p.name, 255, { message: 'Customer name must not exceed 255 characters above!' });
    maxLength(p.phone, 50, { message: 'Customer phone number must not exceed above 50 characters!' })
    email(p.email, { message: 'Customer must have a valid email!' });
    maxLength(p.email, 255, { message: 'Customer email must not exceed above 255 characters!' });
    maxLength(p.address, 255, { message: 'Customer address must not exceed above 1000 characters!' });
    maxLength(p.notes, 255, { message: 'Customer notes must not exceed above 1000 characters!' });
});