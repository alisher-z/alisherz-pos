import { required, schema } from "@angular/forms/signals";
import { BrandType } from "../app/types/form/public-brand";
import { maxLength } from "../app/utils/custome-validations/max.length";

export const BRAND_SCHEMA = schema<BrandType>(p => {
   required(p.pk, { message: 'brand primary key' });
   required(p.name, { message: 'brand name' });

   maxLength(p.name, 255, { message: 'brand name' });
   maxLength(p.notes, 1000, { message: 'brand notes' });
});