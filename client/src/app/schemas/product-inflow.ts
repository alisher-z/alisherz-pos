import { apply, applyEach, hidden, required, schema, validate } from "@angular/forms/signals";
import { ProductInflowType, ProductInflowTypeExt } from "../types/form/product-inflow";
import { maxLength } from "../utils/custome-validations/max.length";
import { CUSTOMER_SCHEMA } from "./party-customer";
import { PRODUCT_INFLOW_DETAIL_SCHEMA_EXT } from "./product-inflow-detail";

export const PRODUCT_INFLOW_SCHEMA = schema<ProductInflowType>(p => {
   required(p.pk, { message: 'product inflow primary key' });
   required(p.date, { message: 'product inflow date' });
   required(p.customer, { message: 'product inflow customer primary key' });

   maxLength(p.id, 100, { message: 'product inflow id' });
   maxLength(p.notes, 1000, { message: 'product inflow notes' });

   applyEach(p.detail.saves, PRODUCT_INFLOW_DETAIL_SCHEMA_EXT);

   validate(p.detail.saves, c => {
      const details = c.valueOf(p.detail.saves);
      if (details.length > 0)
         return undefined;

      return {
         kind: 'details',
         message: 'details must have at least 1 item!'
      }
   })
});

export const PRODUCT_INFLOW_SCHEMA_EXT = schema<ProductInflowTypeExt>(p => {
   apply(p.customer, CUSTOMER_SCHEMA);
   apply(p.inflow, PRODUCT_INFLOW_SCHEMA);

   hidden(p.customer, c => !c.valueOf(p.customer.fresh));
});