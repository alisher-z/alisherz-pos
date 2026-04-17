import { ProductOutflowTypeExt } from "./product-outflow";

export interface ProductInflowDetailType {
   pk: string;
   amount: number;
   discount: number;
   inflow: string;
   outflow: string;
   notes: string | null;
}

export interface ProductInflowDetailTypeExt {
   detail: ProductInflowDetailType;
   outflow: ProductOutflowTypeExt
}