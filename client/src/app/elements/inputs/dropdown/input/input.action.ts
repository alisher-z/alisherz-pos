import { Directive, inject } from "@angular/core";
import { debouncez } from "../../../../utils/util";
import { DropdownBridge } from "../dropdown.bridge";

@Directive()
export class DropdownInputAction {
   search = debouncez((val: any) => this.search_(val), 100);
   bridge = inject(DropdownBridge);

   nextRow() {
      const count = this.bridge.http_.chunks().length;
      this.bridge.index.update(i => {
         const index = i + 1;
         return index >= count ? i : index;
      });
   }

   prevRow() {
      this.bridge.index.update(i => {
         const index = i - 1;
         return index < -1 ? i : index;
      });
   }

   nextPage() {
      const count = this.bridge.http_.chunks().length - 1;
      this.bridge.index.update(i => {
         const index = i + 25;
         return index > count ? count : index;
      });
   }

   prevPage() {
      this.bridge.index.update(i => {
         const index = i - 25;
         return index < 0 ? 0 : index;
      });
   }

   select(input: HTMLInputElement) {
      setTimeout(() => input.select());
   }

   private search_({ value }: HTMLInputElement) {
      this.bridge.http_.setQuery({ search: value.trim() });
   }
}