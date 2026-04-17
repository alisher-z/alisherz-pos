import { iProductPriceHistory } from "../../../types/types";
import { ProductCRUD } from "./product.crud";

export class PriceHistoryCRUD extends ProductCRUD<iProductPriceHistory> {
    model = 'price_history';
}