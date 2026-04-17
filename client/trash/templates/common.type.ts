import { v7 } from "uuid";

export interface iFormCommonType {
   isNew: boolean;
   pk: string;
}

export function formCommonInitialData(): iFormCommonType {
   return {
      pk: v7(),
      isNew: true
   }
}