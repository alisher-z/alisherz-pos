import { min, required, schema } from "@angular/forms/signals";
import { ProductOutflowItemType } from "../app/types/form/product-outflow-item";
import { maxLength } from "../app/utils/custome-validations/max.length";

export const PRODUCT_OUTFLOW_ITEM_SCHEMA = schema<ProductOutflowItemType>(p => {
   required(p.pk, { message: 'product outflow item primary key' });
   required(p.outflow, { message: 'product outflow item outflow primary key' });
   required(p.product, { message: 'product outflow item product primary key' });
   required(p.price, { message: 'product outflow item price primary key' });
   required(p.quantity, { message: 'product outflow item quantity' });
   maxLength(p.notes, 1000, { message: 'product outflow item notes' });
   min(p.quantity, 1, { message: 'product outflow item quantity' });
});