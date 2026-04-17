import { FieldTree } from "@angular/forms/signals";
import { v7 } from "uuid";
import { VendorType } from "../types/form/party-vendor";
import { ProductInventoryType, ProductInventoryTypeExt } from "../types/form/product-inventory";
import { getVendorInitData, getVendorValues } from "./party-vendor";

type Inventory = Partial<{
   vendor: Partial<VendorType>,
   inventory: Partial<ProductInventoryType>
}>;

export function getProductInventoryInitData(data?: Inventory): ProductInventoryTypeExt {
   return {
      vendor: getVendorInitData(data?.vendor ?? { fresh: false }),

      inventory: {
         pk: data?.inventory?.pk ?? v7(),
         id: data?.inventory?.id ?? null,
         date: data?.inventory?.date ?? new Date,
         vendor: data?.inventory?.vendor ?? '',
         notes: data?.inventory?.notes ?? null,
         item: {
            saves: data?.inventory?.item?.saves ?? [],
            deletes: data?.inventory?.item?.deletes ?? []
         }
      }
   }
}

export function getProductInventoryValues(form: FieldTree<ProductInventoryTypeExt>) {
   const { item: { saves, deletes }, ...inventory } = form.inventory().value();

   return {
      vendor: getVendorValues(form.vendor),
      inventory: {
         ...inventory,
         item: {
            saves,
            deletes: deletes && deletes.length > 0
               ? deletes
               : undefined
         }
      }
   }
}