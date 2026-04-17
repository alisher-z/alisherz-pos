import { inject, Injectable } from "@angular/core";
import moment from "moment";
import { DateBoxService } from "../../date.service";

@Injectable()
export class DateTimeService {
   service = inject(DateBoxService);
   timeRegex = /^(?!.*::)([0-1]?[0-9]|2[0-4])(:[0-5]?[0-9]?)?(:[0-5]?[0-9]?)?$/;


   sanitize(e: KeyboardEvent) {
      if (e.ctrlKey || e.altKey || e.metaKey || e.isComposing || e.key.length > 1)
         return;

      const { value, selectionStart, selectionEnd } = <HTMLInputElement>e.target;
      const { key } = e;

      const str = value.substring(0, selectionStart || 0) + key + value.substring(selectionEnd || 0);

      const isValid = this.timeRegex.test(str);
      if (!isValid)
         e.preventDefault();
   }

   getTime(value: string) {
      const timeStr = this.#getTime(value);
      const format = 'H:m:s';
      const m = moment(timeStr, format, true);
      const time = m.isValid() ? m.format(format) : '0:0:0';
      return time.split(':').map(Number);
   }

   setTime([hours, minutes, seconds]: number[]) {
      const date = this.service.value();
      if (!date)
         return;

      date.setHours(hours, minutes, seconds);
      this.service.value.set(new Date(date));
   }

   #getTime(value: string) {
      const [h, m, s] = value
         .replace(/:$/, '')
         .split(':');

      return `${Number(h ?? 0)}:${Number(m ?? 0)}:${Number(s ?? 0)}`;
   }
}