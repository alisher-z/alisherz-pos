import { iCustomer } from "../../../types/types";
import { PartyCRUD } from "./party.crud";

export class CustomerCRUD extends PartyCRUD<iCustomer> {
    model = 'customer';
}