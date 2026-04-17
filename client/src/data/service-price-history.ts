import { FieldTree } from "@angular/forms/signals";
import { v7 } from "uuid";
import { ServicePriceHistoryType, ServicePriceHistoryTypeExt } from "../app/types/form/service-price-history";
import { getServiceSelfInitDataOnly, ServiceSelfTypePartial } from "./service-self";

export type ServicePriceHistoryTypePartial = ServiceSelfTypePartial;

export function getServicePriceHistoryInitDataOnly(data?: Partial<ServicePriceHistoryType>): ServicePriceHistoryType {
   return {
      pk: data?.pk ?? v7(),
      service: data?.service ?? '',
      amount: data?.amount ?? 0
   }
}

export function getServicePriceHistoryInitData(data?: ServicePriceHistoryTypePartial): ServicePriceHistoryTypeExt {
   return {
      history: getServicePriceHistoryInitDataOnly(data?.history),
      service: getServiceSelfInitDataOnly(data?.service ?? { fresh: false })
   }
}

export function getServicePriceHistoryValues(form: FieldTree<ServicePriceHistoryTypeExt>) {
   const { fresh, ...service } = form.service().value();
   return {
      service: fresh ? service : undefined,
      history: form.history().value()
   }
}