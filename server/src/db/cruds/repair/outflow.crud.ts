import { iRepairOutflow } from "../../../types/types";
import { RepairCRUD } from "./repair.crud";

export class ServiceOutflowCRUD extends RepairCRUD<iRepairOutflow> {
    protected model: string = 'outflow';
}