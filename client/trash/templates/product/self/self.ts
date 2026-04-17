import { Component, input } from '@angular/core';
import { Field, FieldTree } from '@angular/forms/signals';
import { NoteBoxInput } from "../../../../elements/inputs/note-box/note-box";
import { TextBoxInput } from "../../../../elements/inputs/text-box/text-box";
import { iProductSelf } from './self.type';

@Component({
  selector: 'product-self-form-template',
  imports: [TextBoxInput, Field, NoteBoxInput],
  templateUrl: './self.html',
  styleUrl: './self.scss',
})
export class ProductSelfFormTemplate {
  readonly tree = input.required<FieldTree<iProductSelf>>();
  get model() {
    return this.tree();
  }
}
