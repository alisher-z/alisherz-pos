import { Component } from '@angular/core';
import { CalendarInputInit } from './calendar.init';
import { CalendarDays } from "./days/days";
import { CalendarMenu } from "./menu/menu";
import { CalendarWeek } from "./week/week";

@Component({
  selector: 'calendar',
  imports: [CalendarMenu, CalendarWeek, CalendarDays],
  templateUrl: './calendar.html',
  styleUrl: './calendar.scss',
})
export class CalendarInput extends CalendarInputInit {
  onToday(date: Date) {
    this.days.set(date);
  }

  keydownOutside(e: KeyboardEvent) {
    if (e.key === 'Escape')
      if (this.visible())
        this.visible.set(false);
  }

  keyupInside(e: KeyboardEvent) {
    if (e.key === 'Escape')
      if (this.visible())
        this.visible.set(false);
  }

  clickOutside() {
    if (!this.visible())
      return;

    const focus = this.parent?.contains(document.activeElement);
    if (!focus)
      this.visible.set(false);
  }
}
