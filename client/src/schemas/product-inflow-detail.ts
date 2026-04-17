import { apply, required, schema } from "@angular/forms/signals";
import { ProductInflowDetailType, ProductInflowDetailTypeExt } from "../app/types/form/product-inflow-details";
import { maxLength } from "../app/utils/custome-validations/max.length";
import { PRODUCT_OUTFLOW_SCHEMA } from "./product-outflow";

export const PRODUCT_INFLOW_DETAIL_SCHEMA = schema<ProductInflowDetailType>(p => {
   required(p.pk, { message: 'product inflow detail primary key' });
   required(p.inflow, { message: 'product inflow detail inflow primary key' });
   required(p.outflow, { message: 'product inflow detail outflow primary key' });

   maxLength(p.notes, 1000, { message: 'product inflow detail notes' });
});

export const PRODUCT_INFLOW_DETAIL_SCHEMA_EXT = schema<ProductInflowDetailTypeExt>(p => {
   apply(p.outflow.outflow, PRODUCT_OUTFLOW_SCHEMA);
   apply(p.detail, PRODUCT_INFLOW_DETAIL_SCHEMA);
});