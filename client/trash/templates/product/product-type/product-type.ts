import { Component, input } from '@angular/core';
import { Field, FieldTree } from '@angular/forms/signals';
import { CheckBoxInput } from "../../../../elements/inputs/check-box/check-box";
import { NoteBoxInput } from "../../../../elements/inputs/note-box/note-box";
import { TextBoxInput } from "../../../../elements/inputs/text-box/text-box";
import { iProductType } from './product-type.type';

@Component({
   selector: 'product-type-form-template',
   imports: [
      Field,
      TextBoxInput,
      NoteBoxInput,
      CheckBoxInput
   ],
   templateUrl: './product-type.html',
   styleUrl: './product-type.scss',
})
export class ProductTypeFormTemplate {
   readonly tree = input.required<FieldTree<iProductType, string | number>>();

   get model() {
      return this.tree();
   }
}
