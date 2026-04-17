import { effect, inject, Injectable, untracked } from "@angular/core";
import { FieldTree } from "@angular/forms/signals";
import { get } from "lodash";
import { HttpBaseZ } from "../../../../components/http-base";
import { ComboBoxBridge } from "../combo-box.bridge";

@Injectable()
export class ComboBoxInputReaction {
   bridge = inject(ComboBoxBridge);
   http_!: HttpBaseZ;
   form!: FieldTree<string, string | number>;
   textbox!: HTMLInputElement;
   shouldSelect = false;
   textChangedFromItemChanges = false;

   private fromSearch = false;

   constructor() {
      effect(() => this.http_ = this.bridge.http());
   }

   onValue(value: string | null) {
      if (this.fromSearch) {
         this.http_.query.pk.set(value ?? '');
         this.fromSearch = false;
      }

      else {
         this.http_.setQuery({ pk: value, reset: value ? true : false });
         if (!value)
            this.form().value.set('');
      }
   }

   onSearch(text: string) {
      const qryText = untracked(this.http_.query.search);
      const itemText = get(this.bridge.item_, this.bridge.field_);
      const pk = untracked(this.bridge.value);

      if ((text === itemText && pk) || this.textChangedFromItemChanges || text === qryText) {
         this.textChangedFromItemChanges = false;
         // console.log(this.textChangedFromItemChanges);
         return;
      }

      if (pk) {
         this.bridge.value.set(null);
         this.fromSearch = true;
      }
      this.http_.setQuery({ search: text });
   }

   onChunks(chunks: any[]) {
      const text = untracked(this.form().value);
      const pk = untracked(this.bridge.value);
      const index = chunks.findIndex(i => i.pk === pk);

      if (chunks.length > 0 && (text || index >= 0)) {
         this.bridge.index.set(text ? 0 : index);
      }
   }

   onItem(item: any) {
      const value = untracked(this.bridge.value);
      const text = get(item, this.bridge.field_);
      if (!value) return;

      this.textChangedFromItemChanges = true;
      this.form().value.set(text ?? '');
   }

   select(_: string) {
      if (!this.shouldSelect) return;

      setTimeout(() => this.textbox.select());
      this.shouldSelect = false;
   }

   goToFirst(e: Event) {
      this.bridge.index.set(0);
      this.selectAndStop(e);
   }

   goToLast(e: Event) {
      const lastRow = this.http_.chunks().length - 1;

      this.bridge.index.set(lastRow);
      this.selectAndStop(e);
   }

   goToNextPage(e: Event) {
      this.bridge.index.update(i => {
         const index = i - 50;
         return index < 0 ? 0 : index;
      });
      this.selectAndStop(e);
   }

   goToPrevPage(e: Event) {
      const count = this.http_.chunks().length - 1;

      this.bridge.index.update(i => {
         const index = i + 50;
         return index > count ? count : index;
      });
      this.selectAndStop(e);
   }

   nextRow(e: Event) {
      const count = this.http_.chunks().length;
      this.bridge.index.update(i => {
         const index = i + 1;
         return index >= count ? i : index;
      });
      this.selectAndStop(e);
   }

   prevRow(e: Event) {
      this.bridge.index.update(i => {
         const index = i - 1;
         return index < -1 ? i : index;
      });
      this.selectAndStop(e);
   }

   selectAndStop(e: Event) {
      e.preventDefault();
      this.textbox.select();
   }
}