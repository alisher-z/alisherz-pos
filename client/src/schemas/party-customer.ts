import { required, schema } from "@angular/forms/signals";
import { CustomerType } from "../app/types/form/party-customer";
import { email } from "../app/utils/custome-validations/email";
import { maxLength } from "../app/utils/custome-validations/max.length";

export const CUSTOMER_SCHEMA = schema<CustomerType>(p => {
   required(p.pk, { message: 'customer primary key' });
   required(p.name, { message: 'customer name' });

   email(p.email, { message: 'customer email' });

   maxLength(p.id, 100, { message: 'customer id' });
   maxLength(p.name, 255, { message: 'customer name' });
   maxLength(p.phone, 50, { message: 'customer phone' });
   maxLength(p.email, 255, { message: 'customer email' });
   maxLength(p.address, 1000, { message: 'customer address' });
   maxLength(p.notes, 1000, { message: 'customer notes' });
});