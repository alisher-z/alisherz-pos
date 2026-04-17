import { FieldTree } from "@angular/forms/signals";
import { v7 } from "uuid";
import { CustomerType } from "../types/form/party-customer";
import { ProductInflowType, ProductInflowTypeExt } from "../types/form/product-inflow";
import { getCustomerInitData, getCustomerValues } from "./party-customer";

type Inflow = Partial<{
   customer: Partial<CustomerType>,
   inflow: Partial<ProductInflowType>
}>

export const PRODUCT_INFLOW_INITIAL_DATA: ProductInflowTypeExt = {
   customer: getCustomerInitData({ fresh: false }),
   inflow: {
      pk: v7(),
      id: null,
      date: new Date,
      customer: '',
      notes: null,
      detail: {
         saves: [],
         deletes: []
      }
   }
}

export function getProductInflowInitData(data?: Inflow): ProductInflowTypeExt {
   return {
      customer: getCustomerInitData(data?.customer ?? { fresh: false }),

      inflow: {
         pk: data?.inflow?.pk ?? v7(),
         id: data?.inflow?.id ?? null,
         date: data?.inflow?.date ?? new Date,
         customer: data?.inflow?.customer ?? '',
         notes: data?.inflow?.notes ?? null,
         detail: {
            saves: data?.inflow?.detail?.saves ?? [],
            deletes: data?.inflow?.detail?.deletes ?? []
         }
      }
   }
}

export function getProductInflowValues(form: FieldTree<ProductInflowTypeExt>) {
   const { detail: { saves, deletes }, ...inflow } = form.inflow().value();
   return {
      customer: getCustomerValues(form.customer),
      inflow: {
         ...inflow,
         detail: {
            saves,
            deletes: deletes && deletes.length > 0
               ? deletes
               : undefined
         }
      }
   }
}