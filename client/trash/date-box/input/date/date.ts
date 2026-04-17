import { DatePipe, formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { IconButton } from "../../../../buttons/icon-button/icon-button";
import { ElExposer } from "../../../../extensions/element-exposer";
import { isSameDate } from '../../../utils/calendar';
import { toDate } from '../../../utils/date-parser';
import { DateBoxDateInputInit } from './date.init';

@Component({
  selector: 'datebox-date',
  imports: [IconButton, DatePipe, ElExposer],
  templateUrl: './date.html',
  styleUrl: './date.scss',
})
export class DateBoxDateInput extends DateBoxDateInputInit {
  dateBlur({ value }: HTMLInputElement) {
    const date = toDate(value);
    this.focused.set(false);

    // if date is null then no need
    // further invastigation.
    if (!date)
      return this.value.set(date);

    // check if the date is changed,
    // then no need to update the value.
    if (isSameDate(this.oldDate, date))
      return;

    // check if the selected date is
    // today, then date and time needs
    // to rendered.
    if (isSameDate(date, new Date))
      return this.value.set(new Date);

    this.value.set(date);
  }

  textFocus() {
    // preserve the date for future check
    this.oldDate = this.value();

    // focused on text input that
    // should be switched to date input
    this.focused.set(true);

    setTimeout(() => {
      this.dateInput?.focus();
      this.dateInput?.select();
    });

    this.focusE.emit();
  }

  dateEscape(target: HTMLInputElement) {
    target.value = this.oldDate ?
      formatDate(this.oldDate, 'dd-MM-y', 'en')
      : '';

    this.escapeE.emit();
  }

  dateInputEl(el: HTMLInputElement) {
    this.dateInput = el;
    this.selfDateE.emit(el);
  }

  textInputEl(el: HTMLInputElement) {
    this.textInput = el;
    this.selfTextE.emit(el);
  }

  clickDown(e: FocusEvent) {
    e.preventDefault();
    this.clickDownE.emit();
  }
}
