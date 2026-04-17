import { CommonType } from "./common";
import { ServicePriceHistoryType } from "./service-price-history";

export interface ServiceSelfType extends CommonType {
   id: string | null;
   name: string;
   notes: string | null;
}

export interface ServiceSelfTypeExt {
   service: ServiceSelfType;
   history: ServicePriceHistoryType;
}