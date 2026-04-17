import { iProductInventory } from "../../../types/types";
import { ProductCRUD } from "./product.crud";

export class ProductInventoryCRUD extends ProductCRUD<iProductInventory> {
    model = 'inventory';
}