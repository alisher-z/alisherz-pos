import { apply, hidden, required, schema, validate } from "@angular/forms/signals";
import { ProductOutflowType, ProductOutflowTypeExt } from "../app/types/form/product-outflow";
import { maxLength } from "../app/utils/custome-validations/max.length";
import { CUSTOMER_SCHEMA } from "./party-customer";

export const PRODUCT_OUTFLOW_SCHEMA = schema<ProductOutflowType>(p => {
   required(p.pk, { message: 'product outflow primary key' });
   required(p.date, { message: 'product outflow date' });
   required(p.customer, { message: 'product outflow customer primary key' });

   maxLength(p.id, 100, { message: 'product outflow id' });
   maxLength(p.notes, 1000, { message: 'product outflow notes' });

   validate(p.item.saves, c => {
      const items = c.valueOf(p.item.saves);
      if (items.length > 0)
         return undefined;

      return {
         kind: 'items',
         message: 'Items must have at least 1 item!'
      }
   });
});

export const PRODUCT_OUTFLOW_SCHEMA_EXT = schema<ProductOutflowTypeExt>(p => {
   apply(p.customer, CUSTOMER_SCHEMA);
   apply(p.outflow, PRODUCT_OUTFLOW_SCHEMA);

   hidden(p.customer, c => !c.valueOf(p.customer.fresh));
});