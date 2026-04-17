import { Component, input } from '@angular/core';
import { FieldTree, FormField } from "@angular/forms/signals";
import { NoteBoxInput } from '../../../../elements/inputs/note-box/note-box';
import { NumberBoxInput } from '../../../../elements/inputs/number-box/number-box';
import { ProductPriceHistoryTypeExt } from '../../../../types/form/product-price-history';
import { FormInputBlackBox } from "../../black-box/black-box";
import { ProductSelfFormTemplate } from "../self/self";

@Component({
  selector: 'product-price-history-form-templatez',
  imports: [FormInputBlackBox, ProductSelfFormTemplate, NumberBoxInput, FormField, NoteBoxInput],
  templateUrl: './price-history.html',
  styleUrl: './price-history.scss',
})
export class ProductPriceHistoryFormTemplate {
  tree = input.required<FieldTree<ProductPriceHistoryTypeExt>>();

  get form() {
    return this.tree();
  }
}
