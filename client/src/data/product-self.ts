import { FieldTree } from "@angular/forms/signals";
import { v7 } from "uuid";
import { ProductPriceHistoryType } from "../app/types/form/product-price-history";
import { ProductSelfType, ProductSelfTypeExt } from "../app/types/form/product-self";
import { ProductTypeType } from "../app/types/form/product-type";
import { BrandType } from "../app/types/form/public-brand";
import { getProductPriceHistoryInitDataOnly, getProductPriceHistoryValuesOnly } from "./product-price-history";
import { getProductTypeInitData, getProductTypeValues } from "./product-type";
import { getBrandInitData, getBrandValues } from "./public-brand";

type Self = Partial<{
   type: Partial<ProductTypeType>,
   brand: Partial<BrandType>,
   history: Partial<ProductPriceHistoryType>,
   product: Partial<ProductSelfType>
}>;

export function getProductSelfInitData(data?: Self): ProductSelfTypeExt {
   return {
      type: getProductTypeInitData(data?.type ?? { fresh: false }),
      brand: getBrandInitData(data?.brand ?? { fresh: false }),
      history: getProductPriceHistoryInitDataOnly(data?.history),
      product: {
         pk: data?.product?.pk ?? v7(),
         barcode: data?.product?.barcode ?? null,
         name: data?.product?.name ?? '',
         type: data?.product?.type ?? '',
         brand: data?.product?.brand ?? '',
         serial: data?.product?.serial ?? null,
         model: data?.product?.model ?? null,
         notes: data?.product?.notes ?? null,
         fresh: data?.product?.fresh ?? true
      }
   }
}

export function getProductSelfValues(form: FieldTree<ProductSelfTypeExt>) {
   const { fresh, ...product } = form().value().product;

   return fresh ? {
      type: getProductTypeValues(form.type),
      brand: getBrandValues(form.brand),
      history: getProductPriceHistoryValuesOnly(form.history),
      product
   } : undefined;
}