import { computed, effect, Injectable, InputSignal, linkedSignal, ModelSignal, Signal, signal, untracked } from "@angular/core";
import { HttpBaseZ } from "../../../components/http-base";
import { Popup } from "../../popup/popup";
import { VirtualTable } from "../../virtual-table/virtual-table";
import { ComboBoxInput } from "./input/input";

/**
 * A local provider used to share state and signals across the ComboBox sub-components.
 * It manages the reactive relationship between the data list, selection, and keyboard indexing.
**/
@Injectable()
export class ComboBoxBridge {
   constructor() {
      effect(() => this.http().asSinglePage());
      effect(() => this.field_ = this.displayField());
      effect(() => this.item_ = this.item());
   }
   http!: InputSignal<HttpBaseZ>;
   isHead!: InputSignal<boolean>;
   isFoot!: InputSignal<boolean>;
   displayField!: InputSignal<string>;
   numberOfColumns!: InputSignal<number | undefined>;

   value!: ModelSignal<string | null>;

   popup!: Signal<Popup>;
   searchInput!: Signal<ComboBoxInput>;
   tableRef!: Signal<VirtualTable>;

   index = signal<number>(-1);
   tableMinWidth = signal<string>('0rem');

   inputID!: string;
   field_!: string;
   item_!: any;


   item = linkedSignal(() =>
      untracked(
         untracked(this.http).chunks
      )[this.index()]
   );
   pk = computed(() => this.item()?.pk);

   setValue() {
      this.value.set(this.pk() ?? null);
   }
}