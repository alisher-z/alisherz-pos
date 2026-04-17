import { Component, input } from '@angular/core';
import { FieldTree, FormField } from '@angular/forms/signals';
import { DateBoxInput } from "../../../../elements/inputs/date-box/date-box";
import { NoteBoxInput } from "../../../../elements/inputs/note-box/note-box";
import { TextBoxInput } from "../../../../elements/inputs/text-box/text-box";
import { ProductInventoryTypeExt } from '../../../../types/form/product-inventory';
import { FormInputBlackBox } from "../../black-box/black-box";
import { VendorFormTemplate } from "../../parties/vendor/vendor";

@Component({
  selector: 'product-inventory-form-templatez',
  imports: [FormInputBlackBox, TextBoxInput, FormField, DateBoxInput, VendorFormTemplate, NoteBoxInput],
  templateUrl: './inventory.html',
  styleUrl: './inventory.scss',
})
export class ProductInventoryFormTemplate {
  tree = input.required<FieldTree<ProductInventoryTypeExt>>();

  get form() {
    return this.tree();
  }
}
