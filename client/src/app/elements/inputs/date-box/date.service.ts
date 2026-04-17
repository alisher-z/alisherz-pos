import { Injectable, ModelSignal, Signal } from "@angular/core";
import { Popup } from "../../popup/popup";
import { DateDay } from "./input/day/day";

@Injectable()
export class DateBoxService {
   value!: ModelSignal<Date | null>;
   dayInput!: Signal<DateDay>;
   popup!: Signal<Popup>;



   isSameDate(date1: Date | null, date2: Date | null) {
      if (!date1 && !date2)
         return true;

      if (!date1 || !date2)
         return false;

      return (
         date1.getFullYear() === date2.getFullYear() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getDate() === date2.getDate()
      );
   }
}