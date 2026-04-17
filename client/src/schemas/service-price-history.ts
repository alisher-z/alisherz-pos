import { apply, hidden, required, schema } from "@angular/forms/signals";
import { ServicePriceHistoryType, ServicePriceHistoryTypeExt } from "../app/types/form/service-price-history";
import { SERVICE_SELF_SCHEMA } from "./service-self";

export const SERVICE_PRICE_HISTORY_SCHEMA = schema<ServicePriceHistoryType>(p => {
   required(p.pk, { message: 'service price history primary key' });
   required(p.amount, { message: 'service price history amount' });
   required(p.service, { message: 'service price history self primary key' });
})

export const SERVICE_PRICE_HISTORY_SCHEMA_EXT = schema<ServicePriceHistoryTypeExt>(p => {
   apply(p.service, SERVICE_SELF_SCHEMA);
   apply(p.history, SERVICE_PRICE_HISTORY_SCHEMA);

   hidden(p.service, c => !c.valueOf(p.service.fresh));
})