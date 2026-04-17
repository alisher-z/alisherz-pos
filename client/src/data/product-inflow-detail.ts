import { FieldTree } from "@angular/forms/signals";
import { v7 } from "uuid";
import { ProductInflowDetailType, ProductInflowDetailTypeExt } from "../app/types/form/product-inflow-details";
import { ProductOutflowTypeExt } from "../app/types/form/product-outflow";
import { getProductOutflowInitData, getProductOutflowValues } from "./product-outflow";

type InflowDetail = Partial<{
   outflow: Partial<ProductOutflowTypeExt>,
   detail: Partial<ProductInflowDetailType>
}>;

export const PRODUCT_INFLOW_DETAIL_INITIAL_DATA: ProductInflowDetailTypeExt = {
   outflow: getProductOutflowInitData(),
   detail: {
      pk: v7(),
      amount: 0,
      discount: 0,
      inflow: '',
      outflow: '',
      notes: null
   }
}

export function getProductInflowDetailInitData(data?: InflowDetail): ProductInflowDetailTypeExt {
   return {
      outflow: getProductOutflowInitData(data?.outflow),
      detail: {
         pk: data?.detail?.pk ?? v7(),
         amount: data?.detail?.amount ?? 0,
         discount: data?.detail?.discount ?? 0,
         inflow: data?.detail?.inflow ?? '',
         outflow: data?.detail?.outflow ?? '',
         notes: data?.detail?.notes ?? null
      }
   }
}


export function getProductInflowDetailValues(form: FieldTree<ProductInflowDetailTypeExt>) {
   return {
      outflow: getProductOutflowValues(form.outflow),
      detail: form.detail().value()
   }
}