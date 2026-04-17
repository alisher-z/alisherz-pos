import { Directive, ElementRef, inject, input, model, output, viewChild } from "@angular/core";
import { FormValueControl, ValidationError, WithOptionalField } from "@angular/forms/signals";
import { v4 } from "uuid";
import { NumberBoxInputService } from "./number-box.service";

@Directive()
export class NumberBoxInputInit implements FormValueControl<number> {
   value = model<number>(0);
   disabled = input<boolean>(false);
   invalid = input<boolean>(false);
   touched = input<boolean>(false);
   required = input<boolean>(false);
   errors = input<readonly WithOptionalField<ValidationError>[]>([]);


   label = input<string | null>(null);
   format = input<string>('1.2-4');
   decimal = input<boolean>(true);

   live = output<number | null>();
   left = output<number | null>();
   self = output<HTMLInputElement>();

   service = inject(NumberBoxInputService);

   numberInputRef = viewChild
      .required<ElementRef<HTMLInputElement>>
      ('numberInput');

   id = v4();
   focused = false;

   get numberInput() {
      return this.numberInputRef().nativeElement;
   }
}