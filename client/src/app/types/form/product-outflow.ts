import { CustomerType } from "./party-customer";
import { ProductOutflowItemType } from "./product-outflow-item";

export interface ProductOutflowType {
   pk: string;
   id: string | null;
   date: Date;
   customer: string;
   notes: string | null;
   item: {
      saves: ProductOutflowItemType[],
      deletes: string[] | undefined
   }
}

export interface ProductOutflowTypeExt {
   customer: CustomerType;
   outflow: ProductOutflowType;
}