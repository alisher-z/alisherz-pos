import { Component } from '@angular/core';
import { getWeek } from '../../../utils/calendar';

@Component({
  selector: 'calendar-week',
  imports: [],
  templateUrl: './week.html',
  styleUrl: './week.scss',
})
export class CalendarWeek {
  week = getWeek();
}
