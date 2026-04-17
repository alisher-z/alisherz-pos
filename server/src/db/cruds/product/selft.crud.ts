import { iProductSelf } from "../../../types/types";
import { ProductCRUD } from "./product.crud";

export class SelfCRUD extends ProductCRUD<iProductSelf> {
    model = 'self';
}