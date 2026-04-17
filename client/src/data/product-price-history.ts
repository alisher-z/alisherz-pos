import { FieldTree } from "@angular/forms/signals";
import { v7 } from "uuid";
import { ProductPriceHistoryType, ProductPriceHistoryTypeExt } from "../app/types/form/product-price-history";
import { ProductSelfTypeExt } from "../app/types/form/product-self";
import { getProductSelfInitData, getProductSelfValues } from "./product-self";

type PriceHistory = Partial<{
   product: Partial<ProductSelfTypeExt>,
   history: Partial<ProductPriceHistoryType>
}>


export function getProductPriceHistoryInitData(data?: PriceHistory): ProductPriceHistoryTypeExt {
   return {
      product: getProductSelfInitData(data?.product ?? {
         product: { fresh: false }
      }),

      history: {
         pk: data?.history?.pk ?? v7(),
         amount: data?.history?.amount ?? 0,
         product: data?.history?.product ?? '',
         notes: data?.history?.notes ?? null
      }
   }
}

export function getProductPriceHistoryInitDataOnly(data?: Partial<ProductPriceHistoryType>): ProductPriceHistoryType {
   return {
      pk: data?.pk ?? v7(),
      amount: data?.amount ?? 0,
      product: data?.product ?? '',
      notes: data?.notes ?? null
   }
}

export function getProductPriceHistoryValues(form: FieldTree<ProductPriceHistoryTypeExt>) {
   return {
      product: getProductSelfValues(form.product),
      history: form().value().history
   }
}

export function getProductPriceHistoryValuesOnly(form: FieldTree<ProductPriceHistoryType>) {
   return form.amount().value() === 0
      ? undefined
      : form().value();
}