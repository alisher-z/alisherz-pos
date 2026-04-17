import { DatePipe } from '@angular/common';
import { Component, effect } from '@angular/core';
import { getMonthDates } from '../../../utils/calendar';
import { CalendarDaysInit } from './days.init';

@Component({
  selector: 'calendar-days',
  imports: [DatePipe],
  templateUrl: './days.html',
  styleUrl: './days.scss'
})
export class CalendarDays extends CalendarDaysInit {
  constructor() {
    super();
    effect(this.onMenu);
  }
  onMenu = () => {
    const date = this.menu();
    const last = this.getLastDates(date);
    const current = getMonthDates({ date, label: 'current' });
    const next = this.getNextDates(date);

    this.dates = [...last, ...current, ...next];
    this.setHeight(this.dates.length);
  }

  clickDown(e: MouseEvent, date: Date) {
    e.preventDefault();

    const _date = this.isToday(date) ? new Date : date;

    this.value.set(_date);
    this.value.set(_date);
    this.clickDownE.emit();
  }

  setHeight(count: number) {
    this.height = count > 35
      ? '18rem' : '15rem';
  }
}