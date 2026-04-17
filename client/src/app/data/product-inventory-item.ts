import { FieldTree } from "@angular/forms/signals";
import { v7 } from "uuid";
import { ProductInventoryItemType, ProductInventoryItemTypeExt } from "../types/form/product-inventory-item";
import { ProductSelfTypeExt } from "../types/form/product-self";
import { getProductSelfInitData, getProductSelfValues } from "./product-self";

type InventoryItem = Partial<{
   product: Partial<ProductSelfTypeExt>,
   item: Partial<ProductInventoryItemType>
}>;

export function getProductInventoryItemInitData(data?: InventoryItem): ProductInventoryItemTypeExt {
   return {
      product: getProductSelfInitData(data?.product ?? {
         product: { fresh: false }
      }),

      item: {
         pk: data?.item?.pk ?? v7(),
         quantity: data?.item?.quantity ?? 1,
         cost: data?.item?.cost ?? 0,
         product: data?.item?.product ?? '',
         inventory: data?.item?.inventory ?? '',
         notes: data?.item?.notes ?? null
      }
   }
}

export function getProductInventoryItemValues(form: FieldTree<ProductInventoryItemTypeExt>) {
   return {
      product: getProductSelfValues(form.product),
      item: form.item().value()
   }
}