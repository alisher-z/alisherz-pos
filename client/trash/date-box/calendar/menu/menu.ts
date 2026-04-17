import { Component, effect, linkedSignal, model, output, untracked } from '@angular/core';
import { getMonths, getYears } from '../../../utils/calendar';
import { CalendarSelect } from './select/select';

@Component({
  selector: 'calendar-menu',
  imports: [CalendarSelect],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class CalendarMenu {
  value = model.required<Date>();
  today = output<Date>();
  todayDown = output<void>();

  year = linkedSignal(() => this.value().getFullYear() - 1925);
  month = linkedSignal(() => this.value().getMonth());

  years = getYears();
  months = getMonths();

  constructor() {
    effect(this.setValue);
  }

  onToday() {
    this.today.emit(new Date);
    this.value.set(new Date);
  }

  setValue = () => {
    const date = new Date(untracked(this.value));
    date.setFullYear(this.years[this.year()], this.month());

    this.value.set(date);
  }
}
