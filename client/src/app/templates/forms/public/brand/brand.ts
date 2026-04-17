import { Component, computed } from '@angular/core';
import { FormField } from "@angular/forms/signals";
import { CheckBoxInput } from '../../../../elements/inputs/check-box/check-box';
import { NoteBoxInput } from '../../../../elements/inputs/note-box/note-box';
import { TextBoxInput } from '../../../../elements/inputs/text-box/text-box';
import { BrandType } from '../../../../types/form/public-brand';
import { FormTemplateCommons } from '../../../extensions/template-common';
import { FormInputBlackBox } from "../../black-box/black-box";
import { BrandDropBox } from "./drop-box/drop-box";

@Component({
  selector: 'brand-form-templatez',
  imports: [TextBoxInput, FormField, NoteBoxInput, CheckBoxInput, BrandDropBox, FormInputBlackBox],
  templateUrl: './brand.html',
  styleUrl: './brand.scss',
})
export class BrandFormTemplate extends FormTemplateCommons<BrandType> {
  override fieldTree = computed(() => this.tree());
}