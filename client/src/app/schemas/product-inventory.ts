import { apply, hidden, required, schema, validate } from "@angular/forms/signals";
import { ProductInventoryType, ProductInventoryTypeExt } from "../types/form/product-inventory";
import { maxLength } from "../utils/custome-validations/max.length";
import { VENDOR_SCHEMA } from "./party-vendor";

export const PRODUCT_INVENTORY_SCHEMA = schema<ProductInventoryType>(p => {
   required(p.pk, { message: 'product inventory primary key' });
   required(p.date, { message: 'product inventory date' });
   required(p.vendor, { message: 'product inventory vendor primary key' });

   maxLength(p.id, 100, { message: 'product inventory id' });
   maxLength(p.notes, 1000, { message: 'product inventory notes' });

   validate(p.item.saves, c => {
      const items = c.valueOf(p.item.saves);
      if (items.length > 0) return undefined;

      return {
         kind: 'inventory-items',
         message: 'items must have at least 1 item!'
      }
   });
});

export const PRODUCT_INVENTORY_SCHEMA_EXT = schema<ProductInventoryTypeExt>(p => {
   apply(p.vendor, VENDOR_SCHEMA);
   apply(p.inventory, PRODUCT_INVENTORY_SCHEMA);

   hidden(p.vendor, c => !c.valueOf(p.vendor.fresh));
})