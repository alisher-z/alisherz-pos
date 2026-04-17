import { CdkOverlayOrigin } from "@angular/cdk/overlay";
import { Component } from '@angular/core';
import { Popup } from "../../popup/popup";
import { DateCalendar } from "./calendar/calendar";
import { DateBoxInputInit } from './date-box.init';
import { DateBoxService } from './date.service';
import { DateDay } from "./input/day/day";
import { DateTime } from "./input/time/time";

@Component({
  selector: 'date',
  templateUrl: './date-box.html',
  styleUrl: './date-box.scss',
  imports: [DateDay, DateCalendar, CdkOverlayOrigin, Popup, DateTime],
  providers: [DateBoxService]
})
export class DateBoxInput extends DateBoxInputInit {

}
