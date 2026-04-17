import { Directive, inject } from "@angular/core";
import { DateCalendarService } from "./calendar.service";

@Directive()
export class DateCalendarInit {
   service = inject(DateCalendarService);
}