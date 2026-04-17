import { Directive, inject, model, viewChild } from "@angular/core";
import { ScrollIntoView } from "../../../../../../extensions/scroll-into-view";
import { Popup } from "../../../../../popup/popup";
import { DateCalendarService } from "../../calendar.service";

@Directive()
export class DateSelectInit extends ScrollIntoView {
   value = model.required<number>();
   popup = viewChild.required(Popup);


   service = inject(DateCalendarService);

   get _items() {
      return this.items();
   }
   get _popup() {
      return this.popup();
   }
}