import { Component, effect, inject, linkedSignal, untracked } from '@angular/core';
import { MONTHS_SHORT, YEARS } from '../../../../../utils/variables';
import { DateCalendarService } from '../calendar.service';
import { DateSelect } from "./select/select";

@Component({
  selector: 'date-menu',
  imports: [DateSelect],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class DateMenu {
  years = YEARS;
  months = MONTHS_SHORT;

  year = linkedSignal(() => this.date.getFullYear() - 1925);
  month = linkedSignal(() => this.date.getMonth());

  service = inject(DateCalendarService);

  setDate = effect(() => {
    const year = this.years[this.year()];
    const month = this.month();
    const date = untracked(this.service.tempDate);
    if (year === date.getFullYear() && month === date.getMonth())
      return;

    date.setFullYear(year, month);
    this.service.tempDate.set(new Date(date));
  })

  todayClick() {
    this.service.service.value.set(new Date);
  }

  get date() {
    return this.service.service.value() ?? new Date;
  }

}
