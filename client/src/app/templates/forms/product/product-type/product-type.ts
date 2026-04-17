import { Component, computed } from '@angular/core';
import { FormField } from "@angular/forms/signals";
import { CheckBoxInput } from '../../../../elements/inputs/check-box/check-box';
import { NoteBoxInput } from '../../../../elements/inputs/note-box/note-box';
import { TextBoxInput } from '../../../../elements/inputs/text-box/text-box';
import { ProductTypeType } from '../../../../types/form/product-type';
import { FormTemplateCommons } from '../../../extensions/template-common';
import { FormInputBlackBox } from "../../black-box/black-box";
import { ProductTypeDropBox } from "./drop-box/drop-box";

@Component({
  selector: 'productype-form-templatez',
  imports: [TextBoxInput, FormField, NoteBoxInput, CheckBoxInput, ProductTypeDropBox, FormInputBlackBox],
  templateUrl: './product-type.html',
  styleUrl: './product-type.scss',
})
export class ProductTypeFormTemplate extends FormTemplateCommons<ProductTypeType> {
  override fieldTree = computed(() => this.tree());
}
