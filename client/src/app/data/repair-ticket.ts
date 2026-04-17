import { FieldTree } from "@angular/forms/signals"
import { v7 } from "uuid"
import { TicketType, TicketTypeExt } from "../types/form/repair-ticket"
import { DeviceTypePartial, getDeviceInitData, getDeviceValues } from "./repair-device"

type TicketTypePartial = Partial<{
   device: DeviceTypePartial,
   ticket: Partial<TicketType>
}>

export function getTicketInitData(data?: TicketTypePartial): TicketTypeExt {
   return {
      device: getDeviceInitData(data?.device ?? { device: { fresh: false } }),
      ticket: {
         pk: data?.ticket?.pk ?? v7(),
         id: data?.ticket?.id ?? null,
         date: data?.ticket?.date ?? new Date,
         customer: data?.ticket?.customer ?? '',
         device: data?.ticket?.device ?? '',
         estimated: data?.ticket?.estimated ?? 0,
         problem: data?.ticket?.problem ?? null,
         fresh: data?.ticket?.fresh ?? true
      }
   }
}

export function getTicketValues(form: FieldTree<TicketTypeExt>) {
   const { fresh, ...ticket } = form.ticket().value();

   const device = getDeviceValues(form.device);
   const t = fresh ? ticket : undefined;

   return device || t
      ? { device, ticket: t }
      : undefined;
}