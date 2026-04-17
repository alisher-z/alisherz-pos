import { FieldTree } from "@angular/forms/signals"
import { v7 } from "uuid"
import { SavesDeletesType } from "../types/form/common"
import { ProductOutflowItemType } from "../types/form/product-outflow-item"
import { RepairOutflowType } from "../types/form/repair-outflow"
import { RepairOutflowServiceType } from "../types/form/repair-outflow-service"

// export type RepairtOutflowTypePartial = Partial<{
//    customer: Partial<CustomerType>,
//    ticket: Partial<TicketTypeExt>,
//    outflow: {
//       pk?: string;
//       id?: string | null;
//       date?: Date;
//       ticket?: string;
//       customer?: string;
//       notes?: string | null;
//       item?: Partial<SavesDeletesType<ProductOutflowItemType>>,
//       service?: Partial<SavesDeletesType<RepairOutflowServiceType>>
//    }
// }>

export type RepairtOutflowTypePartial = Partial<{
   pk?: string;
   id?: string | null;
   date?: Date;
   ticket?: string;
   customer?: string;
   notes?: string | null;
   item?: Partial<SavesDeletesType<ProductOutflowItemType>>,
   service?: Partial<SavesDeletesType<RepairOutflowServiceType>>
}>;

export function getRepairOutflowInitData(data?: RepairtOutflowTypePartial): RepairOutflowType {
   return {
      pk: data?.pk ?? v7(),
      id: data?.id ?? null,
      date: data?.date ?? new Date,
      ticket: data?.ticket ?? '',
      customer: data?.customer ?? '',
      notes: data?.notes ?? null,
      item: {
         saves: data?.item?.saves ?? [],
         deletes: data?.item?.deletes ?? []
      },
      service: {
         saves: data?.service?.saves ?? [],
         deletes: data?.service?.deletes ?? []
      }
   }
}

export function getRepairOutflowValues(form: FieldTree<RepairOutflowType>) {
   const {
      item: {
         saves: itemSaves,
         deletes: itemDeletes
      },
      service: {
         saves: serviceSaves,
         deletes: serviceDeletes
      },
      ...outflow
   } = form().value();

   return {
      ...outflow,
      item: {
         saves: itemSaves,
         deletes: itemDeletes && itemDeletes.length > 0
            ? itemDeletes : undefined
      },
      service: {
         saves: serviceSaves,
         deletes: serviceDeletes && serviceDeletes.length > 0
            ? serviceDeletes : undefined
      }
   }
}