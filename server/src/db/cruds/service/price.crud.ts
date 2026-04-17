import { iServicePriceHistory } from "../../../types/types";
import { ServiceCRUD } from "./service.crud";

export class ServicePriceHistory extends ServiceCRUD<iServicePriceHistory> {
    protected model: string = 'price_history';
}