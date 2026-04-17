import { CommonType } from "./common";

export interface BrandType extends CommonType {
   name: string;
   notes: string | null;
   active: boolean;
}