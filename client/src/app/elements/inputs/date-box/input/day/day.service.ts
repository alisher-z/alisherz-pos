import { inject, Injectable } from "@angular/core";
import moment from "moment";
import { DATE_DASH_REG, DATE_FORMATS, DATE_SLASH_REG } from "../../../../../utils/variables";
import { DateBoxService } from "../../date.service";

@Injectable()
export class DateDayService {
   service = inject(DateBoxService);

   sanitize(e: KeyboardEvent) {
      if (e.ctrlKey || e.altKey || e.metaKey || e.isComposing || e.key.length > 1)
         return;

      const { value, selectionStart, selectionEnd } = <HTMLInputElement>e.target;
      const { key } = e;

      const str = value.substring(0, selectionStart || 0) + key + value.substring(selectionEnd || 0);

      if (!this.#isValid(str))
         e.preventDefault();
   }

   trimTrailing(str: string) {
      return str.replace(/[-\/]$/, "");
   }

   getDate(value: string) {
      const cleaned = this.trimTrailing(value);
      const splited = cleaned.split(/[-\/]/).map(Number);
      if (splited.length < 3)
         return this.#toDateFromArray(splited);

      return this.#toDateFromString(value);
   }

   setDate(date: Date | null, oldDate: Date | null) {
      if (!date)
         return this.service.value.set(null);

      if (this.service.isSameDate(date, oldDate))
         return;

      if (this.service.isSameDate(date, new Date))
         return this.service.value.set(new Date);

      this.service.value.set(date);
   }

   #toDateFromString(value: string) {
      const m = moment(value, DATE_FORMATS, true);
      return m.isValid() ? m.toDate() : null;
   }

   #toDateFromArray(value: number[]) {
      const date = new Date;
      const dateStr = `${date.getFullYear()}/${value[1] ?? date.getMonth() + 1}/${value[0]}`;
      const format = 'YYYY/M/D';


      const m = moment(dateStr, format, true);
      return m.isValid() ? m.toDate() : null;
   }

   #isValid(value: string) {
      return DATE_DASH_REG.test(value) || DATE_SLASH_REG.test(value);
   }

   get popup() {
      return this.service.popup();
   }
}