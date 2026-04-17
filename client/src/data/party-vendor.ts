import { FieldTree } from "@angular/forms/signals";
import { v7 } from "uuid";
import { initialCommonData } from "../app/types/form/common";
import { VendorType } from "../app/types/form/party-vendor";

export const VENDOR_INITIAL_DATA: VendorType = {
   ...initialCommonData(),
   id: null,
   name: '',
   phone: null,
   email: null,
   address: null,
   notes: null,
   active: true
}

export function getVendorInitData(vendor?: Partial<VendorType>): VendorType {
   return {
      pk: vendor?.pk ?? v7(),
      id: vendor?.id ?? null,
      name: vendor?.name ?? '',
      phone: vendor?.phone ?? null,
      email: vendor?.email ?? null,
      address: vendor?.address ?? null,
      notes: vendor?.notes ?? null,
      active: vendor?.active ?? true,
      fresh: vendor?.fresh ?? true
   }
}

export function getVendorValues(form: FieldTree<VendorType>) {
   const { fresh, ...vendor } = form().value();
   return fresh ? vendor : undefined;
}