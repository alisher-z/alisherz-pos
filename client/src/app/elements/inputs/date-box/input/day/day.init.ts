import { Directive, ElementRef, inject, input, viewChild } from "@angular/core";
import { DateDayService } from "./day.service";

@Directive()
export class DateDayInit {
   identity = input<string | null>(null);
   service = inject(DateDayService);

   dateInputRef = viewChild.required<ElementRef<HTMLInputElement>>('dateInput');
   textInputRef = viewChild.required<ElementRef<HTMLInputElement>>('textInput');

   focused = false;
   oldDate: Date | null = null;

   get dateInput() {
      return this.dateInputRef().nativeElement;
   }
   get textInput() {
      return this.textInputRef().nativeElement;
   }

   get value() {
      return this.service.service.value();
   }
}