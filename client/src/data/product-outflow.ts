import { FieldTree } from "@angular/forms/signals";
import { v7 } from "uuid";
import { CustomerType } from "../app/types/form/party-customer";
import { ProductOutflowType, ProductOutflowTypeExt } from "../app/types/form/product-outflow";
import { getCustomerInitData, getCustomerValues } from "./party-customer";

type Outflow = Partial<{
   customer: Partial<CustomerType>,
   outflow: Partial<ProductOutflowType>
}>;

export function getProductOutflowInitData(data?: Outflow): ProductOutflowTypeExt {
   return {
      customer: getCustomerInitData(data?.customer ?? { fresh: false }),

      outflow: {
         pk: data?.outflow?.pk ?? v7(),
         id: data?.outflow?.id ?? null,
         date: data?.outflow?.date ?? new Date,
         customer: data?.outflow?.customer ?? '',
         notes: data?.outflow?.notes ?? null,
         item: {
            saves: data?.outflow?.item?.saves ?? [],
            deletes: data?.outflow?.item?.deletes ?? []
         }
      }
   }
}

export function getProductOutflowValues(form: FieldTree<ProductOutflowTypeExt>) {
   const { item: { saves, deletes }, ...outflow } = form().value().outflow;
   return {
      customer: getCustomerValues(form.customer),
      outflow: {
         ...outflow,
         item: {
            saves,
            deletes: deletes && deletes.length > 0
               ? deletes
               : undefined
         }
      }
   }
}