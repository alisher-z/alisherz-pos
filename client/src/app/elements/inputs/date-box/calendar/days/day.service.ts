import { inject, Injectable } from "@angular/core";
import { DateCalendarService } from "../calendar.service";

type Label = 'last' | 'current' | 'next';
type CalendarDate = {
   label: Label,
   date: Date
}

@Injectable()
export class DateDaysService {
   service = inject(DateCalendarService);

   getNextDates(date: Date) {
      const dates = this.#getMonthDates({ date, label: 'next' });
      const weekDay = 7 - dates.at(0)!.date.getDay();

      return weekDay > 6 ? [] : dates.slice(0, weekDay);
   }

   getCurrentDate(date: Date) {
      return this.#getMonthDates({ date, label: 'current' });
   }

   getLastDates(date: Date) {
      const dates = this.#getMonthDates({ date, label: 'last' });

      const weekDay = dates.at(-1)!.date.getDay() + 1;

      return weekDay > 6 ? [] : dates.slice(weekDay * -1);
   }

   #getMonthDates(args: CalendarDate) {
      const date = this.#createDate(args);
      if (!date)
         return [];

      const month = date.getMonth();
      const dates: CalendarDate[] = [];

      while (date.getMonth() === month) {
         dates.push({
            label: args.label,
            date: new Date(date)
         });
         date.setDate(date.getDate() + 1);
      }
      return dates;
   }

   #createDate({ date, label }: CalendarDate) {
      if (label === 'last')
         return new Date(date.getFullYear(), date.getMonth() - 1, 1)

      if (label === 'current')
         return new Date(date.getFullYear(), date.getMonth(), 1)

      if (label === 'next')
         return new Date(date.getFullYear(), date.getMonth() + 1, 1);

      return null;
   }

   get dayInput() {
      return this.service.dayInput;
   }
   get popup() {
      return this.service.popup;
   }
}