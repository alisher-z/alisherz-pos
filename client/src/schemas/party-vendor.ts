import { required, schema } from "@angular/forms/signals";
import { VendorType } from "../app/types/form/party-vendor";
import { email } from "../app/utils/custome-validations/email";
import { maxLength } from "../app/utils/custome-validations/max.length";

export const VENDOR_SCHEMA = schema<VendorType>(p => {
   required(p.pk, { message: 'vendor primary key' });
   required(p.name, { message: 'vendor name' });

   email(p.email, { message: 'vendor email' });

   maxLength(p.id, 100, { message: 'vendor id' });
   maxLength(p.name, 255, { message: 'vendor name' });
   maxLength(p.phone, 50, { message: 'vendor phone' });
   maxLength(p.email, 255, { message: 'vendor email' });
   maxLength(p.address, 1000, { message: 'vendor address' });
   maxLength(p.notes, 1000, { message: 'vendor notes' });
});