import { Directive, inject, input, model, viewChild } from "@angular/core";
import { FormValueControl, ValidationError, WithOptionalField } from "@angular/forms/signals";
import { v4 } from "uuid";
import { Popup } from "../../popup/popup";
import { DateBoxService } from "./date.service";
import { DateDay } from "./input/day/day";

@Directive()
export class DateBoxInputInit implements FormValueControl<Date | null> {
   constructor() {
      this.service.value = this.value;
      this.service.dayInput = this.dayInput;
      this.service.popup = this.popup;
   }


   label = input<string | null>('null');
   value = model<Date | null>(null);
   disabled = input<boolean>(false);
   invalid = input<boolean>(false);
   touched = input<boolean>(false);
   required = input<boolean>(false);
   errors = input<readonly WithOptionalField<ValidationError>[]>([]);
   timshow = input(false, { alias: 'time' });


   dayInput = viewChild.required(DateDay);
   popup = viewChild.required(Popup);
   elID = v4();



   service = inject(DateBoxService);
}