import { Component, input } from '@angular/core';
import { FieldTree, FormField } from "@angular/forms/signals";
import { DateBoxInput } from '../../../../elements/inputs/date-box/date-box';
import { NoteBoxInput } from '../../../../elements/inputs/note-box/note-box';
import { TextBoxInput } from '../../../../elements/inputs/text-box/text-box';
import { ProductOutflowTypeExt } from '../../../../types/form/product-outflow';
import { FormInputBlackBox } from "../../black-box/black-box";
import { CustomerFormTemplate } from "../../parties/customer/customer";

@Component({
  selector: 'product-outflow-form-templatez',
  templateUrl: './outflow.html',
  styleUrl: './outflow.scss',
  imports: [FormInputBlackBox, TextBoxInput, FormField, DateBoxInput, CustomerFormTemplate, NoteBoxInput],
})
export class ProductOutflowFormTemplate {
  tree = input.required<FieldTree<ProductOutflowTypeExt>>();

  get form() {
    return this.tree();
  }
}
