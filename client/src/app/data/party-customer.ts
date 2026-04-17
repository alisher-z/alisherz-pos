import { FieldTree } from "@angular/forms/signals";
import { v7 } from "uuid";
import { initialCommonData } from "../types/form/common";
import { CustomerType } from "../types/form/party-customer";

export const CUSTOMER_INITIAL_DATA: CustomerType = {
   ...initialCommonData(),
   id: null,
   name: '',
   phone: null,
   email: null,
   address: null,
   notes: null,
   active: true
}

export function getCustomerInitData(customer?: Partial<CustomerType>): CustomerType {
   return {
      pk: customer?.pk ?? v7(),
      id: customer?.id ?? null,
      name: customer?.name ?? '',
      phone: customer?.phone ?? null,
      email: customer?.email ?? null,
      address: customer?.address ?? null,
      notes: customer?.notes ?? null,
      active: customer?.active ?? true,
      fresh: customer?.fresh ?? true
   }
}

export function getCustomerValues(form: FieldTree<CustomerType>) {
   const { fresh, ...customer } = form().value();
   return fresh ? customer : undefined;
}