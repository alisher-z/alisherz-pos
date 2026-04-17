import { Component } from '@angular/core';
import { Field } from "@angular/forms/signals";
import { NoteBoxInput } from "../../../../../elements/inputs/note-box/note-box";
import { NumberBoxInput } from "../../../../../elements/inputs/number-box/number-box";
import { TextBoxInput } from "../../../../../elements/inputs/text-box/text-box";
import { FormTemplateCommonProperties } from '../../../extensions/form-template-common';
import { iProductOutflowItem } from './item.type';

@Component({
  selector: 'product-outflow-item-form-template',
  imports: [TextBoxInput, Field, NumberBoxInput, NoteBoxInput],
  templateUrl: './item.html',
  styleUrl: './item.scss',
})
export class ProductOutflowItemFormTemplate extends FormTemplateCommonProperties<iProductOutflowItem> {

}
