import { computed, Directive, effect, InputSignal, linkedSignal, ModelSignal, OutputEmitterRef, Signal, signal, untracked } from "@angular/core";
import { get } from "lodash";
import { HttpBaseZ } from "../../../components/http-base";
import { Popup } from "../../popup/popup";

@Directive()
export class DropdownBridge {
   http!: InputSignal<HttpBaseZ>;
   http_!: HttpBaseZ;
   isHead!: InputSignal<boolean>;
   numberOfColumns!: InputSignal<number | undefined>;
   index = signal<number>(-1);
   searchText = signal<string>('');
   textbox = signal<HTMLInputElement | null>(null);
   value!: ModelSignal<string | null>;
   disabled!: InputSignal<boolean>;
   field!: InputSignal<string>;
   field_!: string;
   tableMinWidth = signal<string>('0rem');
   popup!: Signal<Popup>;
   ID!: string;
   left!: OutputEmitterRef<any>;

   constructor() {
      effect(() => this.http_ = this.http());
      effect(() => this.field_ = this.field());
      effect(() => this.onValue(this.value()));
      effect((clean) => {
         clean(() => this.index.set(-1));
         this.onChunks(this.http_.chunks());
      });
      effect(() => this.onItem(this.item()));
   }

   item = linkedSignal<number, any>({
      source: () => this.index(),
      computation: (index, prev) => {
         const item = untracked(this.http_.chunks)[index];
         return prev && prev?.value?.pk === item?.pk
            ? prev.value
            : item;
      }
   });

   activePK = computed<string | undefined>(() => this.item()?.pk);
   displayText = computed<string>(() => get(this.item(), this.field_, ''));

   setSearchText() {
      this.searchText.set(this.displayText());
   }

   private onChunks(chunks: any[]) {
      const text = untracked(this.searchText);
      const pk = untracked(this.value);
      const index = chunks.findIndex(i => i.pk === pk);

      if (chunks.length > 0 && (text.length > 0 || index >= 0))
         this.index.set(text.length > 0 ? 0 : index);
      // console.log('hello');
   }

   private onValue(pk: string | null) {
      if (pk)
         this.http_.setQuery({ pk: pk, reset: pk ? true : false });
   }

   private onItem(_: any) {
      // console.log(_);
      if (untracked(this.value))
         this.setSearchText();
   }
}