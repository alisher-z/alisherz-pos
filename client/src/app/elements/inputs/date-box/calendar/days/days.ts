import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { waitForMe } from '../../../../../utils/wait-for-me';
import { DateDaysService } from './day.service';

@Component({
  selector: 'date-days',
  templateUrl: './days.html',
  styleUrl: './days.scss',
  imports: [DatePipe],
  providers: [DateDaysService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateDays {
  service = inject(DateDaysService);

  dates = computed(() => {
    const date = this.service.service.tempDate();
    return [
      ...this.service.getLastDates(date),
      ...this.service.getCurrentDate(date),
      ...this.service.getNextDates(date)
    ];
  });

  height = computed(() =>
    this.dates().length > 35
      ? '18rem' : '15rem'
  )

  async mousedown(e: MouseEvent, date: Date) {
    e.preventDefault();
    this.service.service.service.value.set(
      this.isToday(date)
        ? new Date
        : date
    );

    await waitForMe();
    try {
      this.service.dayInput.dateInput.select();
    } catch {
      this.service.dayInput.textInput.select();
    }
    this.service.popup.hide();
  }

  isToday(date: Date) {
    return this.service.service.service.isSameDate(date, new Date);
  }

  isCurrent(date: Date) {
    return this.service.service.service.isSameDate(
      date,
      this.service.service.service.value()
    );
  }
}
