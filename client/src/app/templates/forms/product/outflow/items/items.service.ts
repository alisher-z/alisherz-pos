import { Injectable, InputSignal, untracked } from "@angular/core";
import { FieldTree } from "@angular/forms/signals";
import { ProductOutflowTypeExt } from "../../../../../types/form/product-outflow";

@Injectable()
export class ProductOutflowItemsService {
   form!: InputSignal<FieldTree<ProductOutflowTypeExt>>;
   itemIndex: number = -1;

   get items_() {
      return untracked(this.form().outflow.item.saves().value);
   }
}