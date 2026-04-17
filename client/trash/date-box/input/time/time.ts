import { DatePipe } from '@angular/common';
import { Component, model } from '@angular/core';
import { IconButton } from "../../../../buttons/icon-button/icon-button";
import { toTime } from '../../../utils/time-parser';

@Component({
  selector: 'datebox-time',
  imports: [DatePipe, IconButton],
  templateUrl: './time.html',
  styleUrl: './time.scss',
})
export class DateBoxTimeInput {
  value = model.required<Date | null>();

  onBlur(e: FocusEvent) {
    const time = toTime((e.target as HTMLInputElement).value);
    const [h, m, s] = time.split(':').map(Number);

    this.value.set(this.setTime(h, m, s));
  }

  currentTime() {
    const date = new Date;
    this.value.set(this.setTime(
      date.getHours(),
      date.getMinutes(),
      date.getSeconds()
    ));
  }

  setTime(hours: number, minutes: number, seconds: number) {
    let value = this.value();
    value = value ? new Date(value) : null;

    if (!value)
      return null;

    value.setHours(hours, minutes, seconds);
    return value;
  }
}
