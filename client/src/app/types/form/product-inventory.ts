import { VendorType } from "./party-vendor";
import { ProductInventoryItemTypeExt } from "./product-inventory-item";

export interface ProductInventoryType {
   pk: string;
   id: string | null;
   date: Date;
   vendor: string;
   notes: string | null;
   item: {
      saves: ProductInventoryItemTypeExt[],
      deletes: string[] | undefined
   }
}

export interface ProductInventoryTypeExt {
   vendor: VendorType;
   inventory: ProductInventoryType;
}