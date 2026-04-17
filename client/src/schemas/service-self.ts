import { apply, required, schema } from "@angular/forms/signals";
import { ServiceSelfType, ServiceSelfTypeExt } from "../app/types/form/service-self";
import { maxLength } from "../app/utils/custome-validations/max.length";
import { SERVICE_PRICE_HISTORY_SCHEMA } from "./service-price-history";

export const SERVICE_SELF_SCHEMA = schema<ServiceSelfType>(p => {
   required(p.pk, { message: 'service self primary key' });
   required(p.name, { message: 'service self name' });

   maxLength(p.id, 100, { message: 'service self id' });
   maxLength(p.name, 255, { message: 'service self name' });
   maxLength(p.notes, 1000, { message: 'service self notes' });
})

export const SERVICE_SELF_SCHEMA_EXT = schema<ServiceSelfTypeExt>(p => {
   apply(p.history, SERVICE_PRICE_HISTORY_SCHEMA);
   apply(p.service, SERVICE_SELF_SCHEMA);
})