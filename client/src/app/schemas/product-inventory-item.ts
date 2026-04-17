import { apply, hidden, required, schema, validate } from "@angular/forms/signals";
import { ProductInventoryItemType, ProductInventoryItemTypeExt } from "../types/form/product-inventory-item";
import { maxLength } from "../utils/custome-validations/max.length";
import { PRODUCT_SELF_SCHEMA_EXT } from "./product-self";

export const PRODUCT_INVENTORY_ITEM_SCHEMA = schema<ProductInventoryItemType>(p => {
   required(p.pk, { message: 'product inventory item primary key' });
   required(p.quantity, { message: 'product inventory item quantity' });
   required(p.cost, { message: 'product inventory item cost' });
   required(p.product, { message: 'product inventory item product primary key' });
   required(p.inventory, { message: 'product inventory item inventory primary key' });
   maxLength(p.notes, 1000, { message: 'product inventory item notes' });

   validate(p.cost, c => {
      if (c.valueOf(p.cost) !== 0)
         return undefined;

      return {
         kind: 'inventory-item-cost',
         message: 'inventory item cost should not be zero!'
      }
   });
});

export const PRODUCT_INVENTORY_ITEM_SCHEMA_EXT = schema<ProductInventoryItemTypeExt>(p => {
   apply(p.product, PRODUCT_SELF_SCHEMA_EXT);
   apply(p.item, PRODUCT_INVENTORY_ITEM_SCHEMA);

   hidden(p.product, c => !c.valueOf(p.product.product.fresh));
});