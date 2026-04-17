import { computed, Injectable, signal, untracked, WritableSignal } from "@angular/core";
import { FieldTree } from "@angular/forms/signals";
import { ProductOutflowTypeExt } from "../../../../../types/form/product-outflow";

@Injectable()
export class ProductOutflowItemsService {
   form!: FieldTree<ProductOutflowTypeExt>;
   model!: WritableSignal<ProductOutflowTypeExt>;
   itemPK = signal<string | null>(null);
   item = computed(() => this.items_.find(i => i.pk === this.itemPK()));

   get primaryKey_() {
      return untracked(this.form.outflow.pk().value);
   }

   get items_() {
      return untracked(this.form.outflow.item.saves().value);
   }

   get itemsTree() {
      return this.form.outflow.item.saves;
   }
}