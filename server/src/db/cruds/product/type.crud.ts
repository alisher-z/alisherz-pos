import { iProductType } from "../../../types/types";
import { ProductCRUD } from "./product.crud";

export class TypeCRUD extends ProductCRUD<iProductType> {
    model = 'type';
}