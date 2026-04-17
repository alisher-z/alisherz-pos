import { FieldTree } from "@angular/forms/signals"
import { v7 } from "uuid"
import { ServicePriceHistoryType } from "../app/types/form/service-price-history"
import { ServiceSelfType, ServiceSelfTypeExt } from "../app/types/form/service-self"
import { getServicePriceHistoryInitDataOnly } from "./service-price-history"

export type ServiceSelfTypePartial = Partial<{
   service: Partial<ServiceSelfType>,
   history: Partial<ServicePriceHistoryType>
}>

export function getServiceSelfInitDataOnly(data?: Partial<ServiceSelfType>): ServiceSelfType {
   return {
      pk: data?.pk ?? v7(),
      id: data?.id ?? null,
      name: data?.name ?? '',
      notes: data?.notes ?? null,
      fresh: data?.fresh ?? true
   }
}

export function getServiceSelfInitData(data?: ServiceSelfTypePartial): ServiceSelfTypeExt {
   return {
      service: getServiceSelfInitDataOnly(data?.service),
      history: getServicePriceHistoryInitDataOnly(data?.history)
   }
}

export function getServiceSelfValue(form: FieldTree<ServiceSelfTypeExt>) {
   const { fresh, ...service } = form.service().value();
   const amount = form.history.amount().value();
   return fresh ? {
      service,
      history: amount === 0
         ? undefined
         : form.history().value()
   } : undefined
}