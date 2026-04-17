import { DatePipe, formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { waitForMe } from '../../../../../utils/wait-for-me';
import { IconButton } from '../../../../buttons/icon-button/icon-button';
import { DateDayInit } from './day.init';
import { DateDayService } from './day.service';

@Component({
  selector: 'date-day',
  templateUrl: './day.html',
  styleUrl: './day.scss',
  imports: [IconButton, DatePipe],
  providers: [DateDayService]
})
export class DateDay extends DateDayInit {

  async focus() {
    this.oldDate = this.service.service.value();
    this.focused = true;
    this.service.popup.show();
    await waitForMe();
    this.dateInput.select();
  }

  blur({ value }: HTMLInputElement) {
    this.focused = false;
    if (this.service.popup.opened())
      return this.reset();

    const date = this.service.getDate(value);
    this.service.setDate(date, this.oldDate);
  }

  keydown(e: KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      if (this.service.popup.opened())
        return;
      this.service.popup.show();
      this.dateInput.select();
      e.preventDefault();
    }
    this.service.sanitize(e);
  }

  escape(e: Event) {
    const date = this.service.getDate(this.dateInput.value);


    if (!this.service.service.isSameDate(date, this.oldDate))
      e.stopPropagation();


    this.reset();
    this.dateInput.select();
  }

  mousedown(e: MouseEvent) {
    this.service.popup.toggle();

    try {
      this.dateInput.select();
    } catch {
      this.textInput.select();
    }

    e.preventDefault();
  }

  reset() {
    this.service.service.value.set(this.oldDate);
    this.dateInput.value = this.oldDate ?
      formatDate(this.oldDate, 'dd-MM-y', 'en')
      : '';
  }
}
