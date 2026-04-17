import { apply, hidden, required, schema } from "@angular/forms/signals";
import { ProductPriceHistoryType, ProductPriceHistoryTypeExt } from "../types/form/product-price-history";
import { maxLength } from "../utils/custome-validations/max.length";
import { PRODUCT_SELF_SCHEMA_EXT } from "./product-self";

export const PRODUCT_PRICE_HISTORY_SCHEMA = schema<ProductPriceHistoryType>(p => {
   required(p.pk, { message: 'product price history primary key' });
   required(p.amount, { message: 'product price history amount' });
   required(p.product, { message: 'product price history product primary key' });

   maxLength(p.notes, 1000, { message: 'product price history notes' });
});

export const PRODUCT_PRICE_HISTORY_SCHEMA_EXT = schema<ProductPriceHistoryTypeExt>(p => {
   apply(p.history, PRODUCT_PRICE_HISTORY_SCHEMA);
   apply(p.product, PRODUCT_SELF_SCHEMA_EXT);

   hidden(p.product, c => !c.valueOf(p.product.product.fresh));
});