import { apply, hidden, required, schema } from "@angular/forms/signals";
import { ProductSelfType, ProductSelfTypeExt } from "../app/types/form/product-self";
import { maxLength } from "../app/utils/custome-validations/max.length";
import { PRODUCT_PRICE_HISTORY_SCHEMA } from "./product-price-history";
import { PRODUCT_TYPE_SCHEMA } from "./product-type";
import { BRAND_SCHEMA } from "./public-brand";

export const PRODUCT_SELF_SCHEMA = schema<ProductSelfType>(p => {
   required(p.pk, { message: 'product self primary key' });
   required(p.name, { message: 'product self name' });
   required(p.type, { message: 'product self type primary key' });
   required(p.brand, { message: 'product self brand primary key' });

   maxLength(p.barcode, 100, { message: 'product self barcode' });
   maxLength(p.name, 255, { message: 'product self name' });
   maxLength(p.serial, 100, { message: 'product self serial' });
   maxLength(p.model, 100, { message: 'product self model' });
   maxLength(p.notes, 1000, { message: 'product self notes' });
});

export const PRODUCT_SELF_SCHEMA_EXT = schema<ProductSelfTypeExt>(p => {
   apply(p.type, PRODUCT_TYPE_SCHEMA);
   apply(p.brand, BRAND_SCHEMA);
   apply(p.product, PRODUCT_SELF_SCHEMA);
   apply(p.history, PRODUCT_PRICE_HISTORY_SCHEMA);

   hidden(p.type, c => !c.valueOf(p.type.fresh));
   hidden(p.brand, c => !c.valueOf(p.brand.fresh));
});