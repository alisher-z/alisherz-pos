import { FieldTree } from "@angular/forms/signals";
import { v7 } from "uuid";
import { BrandType } from "../types/form/public-brand";


export function getBrandInitData(data?: Partial<BrandType>): BrandType {
   return {
      pk: data?.pk ?? v7(),
      name: data?.name ?? '',
      active: data?.active ?? true,
      notes: data?.notes ?? null,
      fresh: data?.fresh ?? true
   }
}

export function getBrandValues(form: FieldTree<BrandType>) {
   const { fresh, ...brand } = form().value();
   return fresh ? brand : undefined;
}