import { ProductSelfTypeExt } from "./product-self";

export interface ProductPriceHistoryType {
   pk: string;
   amount: number;
   product: string;
   notes: string | null;
}

export interface ProductPriceHistoryTypeExt {
   history: ProductPriceHistoryType;
   product: ProductSelfTypeExt;
}