import { Directive, input, model } from "@angular/core";
import { FieldTree, FormValueControl } from "@angular/forms/signals";

@Directive()
export class FormInputCommons<T> implements FormValueControl<string | null> {
   tree = input.required<FieldTree<T>>();
   value = model<string | null>(null);
   label = input<string | null>(null);

   get form() {
      return this.tree();
   }
}