import { Injectable, InputSignal, untracked } from "@angular/core";
import { FieldTree } from "@angular/forms/signals";
import { ProductInventoryType } from "../../../../../types/form/product-inventory";

@Injectable()
export class ProductInventoryItemsService {
   form!: InputSignal<FieldTree<ProductInventoryType>>;
   itemIndex: number = -1;

   get items_() {
      return untracked(this.form().item.saves().value);
   }
}