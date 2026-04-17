import { FieldTree } from "@angular/forms/signals";
import { v7 } from "uuid";
import { ProductTypeType } from "../app/types/form/product-type";

export function getProductTypeInitData(data?: Partial<ProductTypeType>): ProductTypeType {
   return {
      pk: data?.pk ?? v7(),
      name: data?.name ?? '',
      active: data?.active ?? true,
      notes: data?.notes ?? null,
      fresh: data?.fresh ?? true
   }
}

export function getProductTypeValues(form: FieldTree<ProductTypeType>) {
   const { fresh, ...productType } = form().value();
   return fresh ? productType : undefined;
}