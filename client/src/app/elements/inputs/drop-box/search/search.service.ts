import { effect, inject, Injectable, untracked } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { waitForMe } from "../../../../utils/wait-for-me";
import { DropBoxService } from "../drop-box.service";

@Injectable()
export class DropBoxSearchService {
   service = inject(DropBoxService);
   sanitizer = inject(DomSanitizer);


   searchInput: HTMLInputElement | null = null;
   dontSetText = false;

   filter(text: string) {
      const list: any[] = [];
      const find = this.findAndMark(text);

      for (const item of this.list_)
         find(item) ? list.push(item) : null;

      this.arrage(list, text);
      this.service.items.set(list);
   }

   onValue = effect(async () => {
      const value = this.service.value();
      if (!value)
         return this.setIndex(-1);

      const index = this.items_.findIndex(i => i.pk === value);
      this.setIndex(index);

      if (index < 0)
         this.service.value.set(null);
   })

   onIndex = effect(() => {
      const i = this.dropList_.index();
      const item = this.items_[i];
      this.service.item.set(item ?? null);
   })

   onItem = effect(() => {
      const item = this.service.item();
      this.setValue(item?.pk ?? null);
      this.setText(item?.[this.by] ?? null);
   })

   async showPopup(toggle = false) {
      toggle
         ? this.popup.toggle()
         : this.popup.show();
      await waitForMe();
      this.dropboxList.onIndex();
   }

   private async setText(t: string | null) {
      if (this.dontSetText) {
         this.dontSetText = false;
         return;
      }

      await waitForMe();
      if (this.searchInput)
         this.searchInput.value = <any>t;
   }

   private setValue(pk: string | null) {
      const value = untracked(this.service.value);

      if (pk === value) return;
      this.service.value.set(pk);
   }

   private findAndMark(text: string) {
      const regex = new RegExp(text, 'i');

      return (item: any) => {
         const value: string = item[this.by];
         const match = regex.exec(value.replace(/\s+/g, ''));
         if (!match)
            return null;

         const { 0: found, index } = match;

         item.marked = this.sanitizer
            .bypassSecurityTrustHtml(
               value.replace(regex, `<mark>${found}</mark>`)
            );
         item.sorting = index;

         return item;
      }
   }

   private sort(list: any[]) {
      list.sort((a, b) =>
         a.sorting !== b.sorting
            ? a.sorting - b.sorting
            : a.index - b.index
      );
   }

   private arrage(list: any[], text: string) {
      text ? this.sort(list) : this.revert(list);
   }

   private revert(list: any[]) {
      list.sort((a, b) => a.index - b.index);
   }

   get by() {
      return this.service.by();
   }
   get list_() {
      return untracked(this.service.list);
   }
   get items_() {
      return untracked(this.service.items);
   }
   get item_() {
      return untracked(this.service.item);
   }
   get dropboxList() {
      return this.service.dropboxList();
   }
   get dropList_() {
      return untracked(this.service.dropboxList);
   }
   get setIndex() {
      return this.dropboxList.setIndex;
   }
   get increaseIndex() {
      return this.dropboxList.increaseIndex;
   }
   get decreaseIndex() {
      return this.dropboxList.decreaseIndex;
   }
   get text() {
      return this.searchInput?.value ?? null;
   }
   get popup() {
      return this.service.popup();
   }
}