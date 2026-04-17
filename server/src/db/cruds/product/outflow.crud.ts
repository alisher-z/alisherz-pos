import { iProductOutflow } from "../../../types/types";
import { ProductCRUD } from "./product.crud";

export class ProdudctOutflowCRUD extends ProductCRUD<iProductOutflow> {
    model = 'outflow';
}