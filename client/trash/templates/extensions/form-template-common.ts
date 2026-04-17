import { Directive, input } from "@angular/core";
import { FieldTree } from "@angular/forms/signals";

@Directive()
export class FormTemplateCommonProperties<T> {
   readonly tree = input.required<FieldTree<T, string | number>>();

   get form() {
      return this.tree();
   }
}