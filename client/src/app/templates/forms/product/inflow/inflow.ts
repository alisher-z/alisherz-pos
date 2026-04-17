import { Component, input } from '@angular/core';
import { FieldTree, FormField } from '@angular/forms/signals';
import { DateBoxInput } from "../../../../elements/inputs/date-box/date-box";
import { NoteBoxInput } from "../../../../elements/inputs/note-box/note-box";
import { TextBoxInput } from "../../../../elements/inputs/text-box/text-box";
import { ProductInflowTypeExt } from '../../../../types/form/product-inflow';
import { FormInputBlackBox } from "../../black-box/black-box";
import { CustomerFormTemplate } from "../../parties/customer/customer";

@Component({
  selector: 'product-inflow-form-templatez',
  imports: [FormInputBlackBox, TextBoxInput, FormField, DateBoxInput, CustomerFormTemplate, NoteBoxInput],
  templateUrl: './inflow.html',
  styleUrl: './inflow.scss',
})
export class ProductInflowFormTemplate {
  tree = input.required<FieldTree<ProductInflowTypeExt>>();

  get form() {
    return this.tree();
  }
}
