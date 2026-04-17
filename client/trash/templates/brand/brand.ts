import { Component, input } from '@angular/core';
import { Field, FieldTree } from '@angular/forms/signals';
import { CheckBoxInput } from "../../../../elements/inputs/check-box/check-box";
import { NoteBoxInput } from "../../../../elements/inputs/note-box/note-box";
import { TextBoxInput } from "../../../../elements/inputs/text-box/text-box";
import { iBrand } from './brand.type';

@Component({
  selector: 'brand-form-template',
  imports: [TextBoxInput, Field, NoteBoxInput, CheckBoxInput],
  templateUrl: './brand.html',
  styleUrl: './brand.scss',
})
export class BrandFormTemplate {
  readonly tree = input.required<FieldTree<iBrand, string | number>>();
  get model() {
    return this.tree();
  }
}
