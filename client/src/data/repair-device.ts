import { FieldTree } from "@angular/forms/signals"
import { v7 } from "uuid"
import { CustomerType } from "../app/types/form/party-customer"
import { BrandType } from "../app/types/form/public-brand"
import { DeviceType, DeviceTypeExt } from "../app/types/form/repair-device"
import { getCustomerInitData, getCustomerValues } from "./party-customer"
import { getBrandInitData, getBrandValues } from "./public-brand"

export type DeviceTypePartial = Partial<{
   customer: Partial<CustomerType>,
   brand: Partial<BrandType>,
   device: Partial<DeviceType>
}>

export function getDeviceInitData(data?: DeviceTypePartial): DeviceTypeExt {
   return {
      customer: getCustomerInitData(data?.customer ?? { fresh: false }),
      brand: getBrandInitData(data?.brand ?? { fresh: false }),
      device: {
         pk: data?.device?.pk ?? v7(),
         brand: data?.device?.brand ?? '',
         customer: data?.device?.customer ?? '',
         model: data?.device?.model ?? null,
         serial: data?.device?.serial ?? null,
         notes: data?.device?.notes ?? null,
         fresh: data?.device?.fresh ?? true
      }
   }
}

export function getDeviceValues(form: FieldTree<DeviceTypeExt>) {
   const { fresh, ...device } = form.device().value();

   return fresh ? {
      customer: getCustomerValues(form.customer),
      brand: getBrandValues(form.brand),
      device: device
   } : undefined;
}