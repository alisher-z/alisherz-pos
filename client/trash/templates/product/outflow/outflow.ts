import { Component, effect } from '@angular/core';
import { Field } from "@angular/forms/signals";
import { DateBoxInput } from "../../../../elements/inputs/date-box/date-box";
import { NoteBoxInput } from "../../../../elements/inputs/note-box/note-box";
import { TextBoxInput } from "../../../../elements/inputs/text-box/text-box";
import { FormTemplateCommonProperties } from '../../extensions/form-template-common';
import { iProductOutflow } from './outflow.type';

@Component({
  selector: 'product-outflow-form-template',
  imports: [TextBoxInput, Field, DateBoxInput, NoteBoxInput],
  templateUrl: './outflow.html',
  styleUrl: './outflow.scss',
})
export class ProductOutflowFormTemplate extends FormTemplateCommonProperties<iProductOutflow> {
  e = effect(() => {
    // console.log(this.tree()().value());
  })
}