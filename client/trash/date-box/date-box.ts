import { Component } from '@angular/core';
import { CalendarInput } from "./calendar/calendar";
import { DateBoxInputInit } from './date-box.init';
import { DateBoxDateInput } from "./input/date/date";
import { DateBoxTimeInput } from "./input/time/time";

@Component({
  selector: 'date',
  imports: [CalendarInput, DateBoxDateInput, DateBoxTimeInput],
  templateUrl: './date-box.html',
  styleUrl: './date-box.scss',
})
export class DateBoxInput extends DateBoxInputInit {
  ngAfterViewInit() {
    this.element.emit(this.textInput)
  }
  dateClickDown() {
    this.toggleCalendar();
    this.textInput?.focus();
  }

  dayClickDown() {
    setTimeout(() => this.dateInput?.select());
    this.textInput?.select();
    this.hideCalendar();
  }

  dateFocus() {
    this.showCalendar();
  }

  dateBlur() {
    if (!this.calClicked())
      this.hideCalendar();
    this.calClicked.set(false);

    this.left.emit(this.value());
  }

  dateEscape() {
    this.dateInput?.select();
    this.hideCalendar();
  }

  todayDown() {
    setTimeout(() => {
      this.textInput?.select()
      this.hideCalendar()
    });
  }
}
