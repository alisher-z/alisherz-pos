import { Component, input } from '@angular/core';
import { FieldTree, FormField } from '@angular/forms/signals';
import { NoteBoxInput } from "../../../../../../elements/inputs/note-box/note-box";
import { NumberBoxInput } from "../../../../../../elements/inputs/number-box/number-box";
import { ProductInventoryItemTypeExt } from '../../../../../../types/form/product-inventory-item';
import { FormInputBlackBox } from "../../../../black-box/black-box";
import { ProductSelfFormTemplate } from "../../../self/self";

@Component({
  selector: 'product-inventory-item-templatez',
  imports: [FormInputBlackBox, ProductSelfFormTemplate, NumberBoxInput, FormField, NoteBoxInput],
  templateUrl: './item.html',
  styleUrl: './item.scss',
})
export class ProductInventoryItemTemplate {
  tree = input.required<FieldTree<ProductInventoryItemTypeExt>>();

  get form() {
    return this.tree();
  }
}
