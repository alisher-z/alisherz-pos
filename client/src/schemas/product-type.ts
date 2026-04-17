import { required, schema } from "@angular/forms/signals";
import { ProductTypeType } from "../app/types/form/product-type";
import { maxLength } from "../app/utils/custome-validations/max.length";

export const PRODUCT_TYPE_SCHEMA = schema<ProductTypeType>(p => {
   required(p.pk, { message: 'product type primary key' });
   required(p.name, { message: 'product type name' });

   maxLength(p.name, 255, { message: 'product type name' });
   maxLength(p.notes, 1000, { message: 'product type notes' });
});