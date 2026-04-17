import { FieldTree } from "@angular/forms/signals";
import { v7 } from "uuid";
import { ProductOutflowItemType } from "../types/form/product-outflow-item";

export function getProductOutflowItemInitData(data?: Partial<ProductOutflowItemType>): ProductOutflowItemType {
   return {
      pk: data?.pk ?? v7(),
      outflow: data?.outflow ?? '',
      product: data?.product ?? '',
      price: data?.price ?? '',
      quantity: data?.quantity ?? 1,
      notes: data?.notes ?? null
   }
}

export function getProductOutflowItemValues(form: FieldTree<ProductOutflowItemType>) {
   return form().value();
}