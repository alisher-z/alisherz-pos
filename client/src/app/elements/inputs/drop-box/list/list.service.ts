import { inject, Injectable } from "@angular/core";
import { DropBoxService } from "../drop-box.service";

@Injectable()
export class DropBoxListService {
   service = inject(DropBoxService);

   get popup() {
      return this.service.popup();
   }
   get dropboxSearch() {
      return this.service.dropboxSearch();
   }
   get searchInput() {
      return this.dropboxSearch.service.searchInput;
   }
   get item() {
      return this.service.item;
   }
}