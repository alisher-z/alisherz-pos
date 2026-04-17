import { CommonType } from "./common";
import { ProductPriceHistoryType } from "./product-price-history";
import { ProductTypeType } from "./product-type";
import { BrandType } from "./public-brand";

export interface ProductSelfType extends CommonType {
   barcode: string | null;
   name: string;
   type: string;
   brand: string;
   serial: string | null;
   model: string | null;
   notes: string | null;
};

export interface ProductSelfTypeExt {
   type: ProductTypeType;
   brand: BrandType;
   product: ProductSelfType;
   history: ProductPriceHistoryType;
}