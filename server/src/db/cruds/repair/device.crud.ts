import { iDevice } from "../../../types/types";
import { RepairCRUD } from "./repair.crud";

export class DeviceCRUD extends RepairCRUD<iDevice> {
    model = 'device';
}