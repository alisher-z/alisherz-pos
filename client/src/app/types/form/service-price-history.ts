import { ServiceSelfType } from "./service-self";

export interface ServicePriceHistoryType {
   pk: string;
   amount: number;
   service: string;
}

export interface ServicePriceHistoryTypeExt {
   service: ServiceSelfType;
   history: ServicePriceHistoryType;
}