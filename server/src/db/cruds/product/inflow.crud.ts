import { iProductInflow } from "../../../types/types";
import { ProductCRUD } from "./product.crud";

export class ProductInflowCRUD extends ProductCRUD<iProductInflow> {
    protected model: string = 'inflow';
}