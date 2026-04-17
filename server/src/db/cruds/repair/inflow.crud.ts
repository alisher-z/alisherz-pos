import { iRepairInflow } from "../../../types/types";
import { RepairCRUD } from "./repair.crud";

export class RepairInflowCRUD extends RepairCRUD<iRepairInflow> {
    protected model: string = 'inflow';
}