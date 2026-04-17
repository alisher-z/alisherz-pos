import { iServiceSelf } from "../../../types/types";
import { ServiceCRUD } from "./service.crud";

export class ServiceSelfCRUD extends ServiceCRUD<iServiceSelf> {
    model = 'self';
}