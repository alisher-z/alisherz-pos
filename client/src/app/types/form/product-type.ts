import { CommonType } from "./common";

export interface ProductTypeType extends CommonType {
   name: string;
   active: boolean;
   notes: string | null;
}