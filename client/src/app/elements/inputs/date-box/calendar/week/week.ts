import { Component } from '@angular/core';
import { WEEK_DAYS_SHORT } from '../../../../../utils/variables';

@Component({
  selector: 'date-week',
  imports: [],
  templateUrl: './week.html',
  styleUrl: './week.scss',
})
export class DateWeek {
  week = WEEK_DAYS_SHORT;
}
