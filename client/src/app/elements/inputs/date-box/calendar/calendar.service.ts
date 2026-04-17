import { inject, Injectable, linkedSignal } from "@angular/core";
import { DateBoxService } from "../date.service";

@Injectable()
export class DateCalendarService {
   service = inject(DateBoxService);
   tempDate = linkedSignal(() => new Date(this.service.value() ?? new Date));


   get popup() {
      return this.service.popup();
   }
   get dayInput() {
      return this.service.dayInput();
   }
}