import { v7 } from "uuid";

export interface CommonType {
   fresh: boolean;
   pk: string;
}

export interface SavesDeletesType<T> {
   saves: T[],
   deletes: string[] | undefined
}

export function initialCommonData(): CommonType {
   return {
      pk: v7(),
      fresh: true
   }
}