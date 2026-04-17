import { FieldTree } from "@angular/forms/signals";
import { v7 } from "uuid";
import { RepairOutflowServiceType } from "../types/form/repair-outflow-service";

export function getRepairOutflowServiceInitData(data?: Partial<RepairOutflowServiceType>): RepairOutflowServiceType {
   return {
      pk: data?.pk ?? v7(),
      service: data?.service ?? '',
      outflow: data?.outflow ?? '',
      price: data?.price ?? '',
      duration: data?.duration ?? '',
      notes: data?.notes ?? null
   }
}

export function getRepairOutflowServiceValues(form: FieldTree<RepairOutflowServiceType>) {
   return form().value();
}