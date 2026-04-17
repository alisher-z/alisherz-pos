import { iVednor } from "../../../types/types";
import { PartyCRUD } from "./party.crud";

export class VendorCRUD extends PartyCRUD<iVednor> {
    model = 'vendor';
}