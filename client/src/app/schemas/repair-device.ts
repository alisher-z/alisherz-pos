import { apply, hidden, required, schema } from "@angular/forms/signals";
import { DeviceType, DeviceTypeExt } from "../types/form/repair-device";
import { maxLength } from "../utils/custome-validations/max.length";
import { CUSTOMER_SCHEMA } from "./party-customer";
import { BRAND_SCHEMA } from "./public-brand";

export const DEVICE_SCHEMA = schema<DeviceType>(p => {
   required(p.pk, { message: 'device primary key' });
   required(p.brand, { message: 'device brand primary key' });
   required(p.customer, { message: 'device customer primary key' });

   maxLength(p.model, 255, { message: 'device model' });
   maxLength(p.serial, 255, { message: 'device serial' });
   maxLength(p.notes, 1000, { message: 'device notes' });
});

export const DEVICE_SCHEMA_EXT = schema<DeviceTypeExt>(p => {
   apply(p.customer, CUSTOMER_SCHEMA);
   apply(p.brand, BRAND_SCHEMA);
   apply(p.device, DEVICE_SCHEMA);

   hidden(p.customer, c => !c.valueOf(p.customer.fresh));
   hidden(p.brand, c => !c.valueOf(p.brand.fresh));
});