import { Component } from '@angular/core';
import { DateCalendarInit } from './calendar.init';
import { DateCalendarService } from './calendar.service';
import { DateDays } from "./days/days";
import { DateMenu } from "./menu/menu";
import { DateWeek } from "./week/week";

@Component({
  selector: 'date-calendar',
  templateUrl: './calendar.html',
  styleUrl: './calendar.scss',
  imports: [DateMenu, DateWeek, DateDays],
  providers: [DateCalendarService]
})
export class DateCalendar extends DateCalendarInit {

}
