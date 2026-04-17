import { CommonType } from "./common";

export interface VendorType extends CommonType {
   id: string | null;
   name: string;
   phone: string | null;
   email: string | null;
   address: string | null;
   notes: string | null;
   active: boolean;
}