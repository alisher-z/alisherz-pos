import { iTicket } from "../../../types/types";
import { RepairCRUD } from "./repair.crud";

export class TicketCRUD extends RepairCRUD<iTicket> {
    model = 'ticket';
}