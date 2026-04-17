import { Component, computed, effect } from '@angular/core';
import { FormField } from "@angular/forms/signals";
import { NoteBoxInput } from '../../../../elements/inputs/note-box/note-box';
import { TextBoxInput } from '../../../../elements/inputs/text-box/text-box';
import { ProductSelfTypeExt } from '../../../../types/form/product-self';
import { FormTemplateCommons } from '../../../extensions/template-common';
import { FormInputBlackBox } from "../../black-box/black-box";
import { BrandFormTemplate } from "../../public/brand/brand";
import { ProductTypeFormTemplate } from "../product-type/product-type";
import { ProductSelfDropBox } from "./drop-box/drop-box";

@Component({
  selector: 'productself-form-templatez',
  imports: [TextBoxInput, FormField, ProductTypeFormTemplate, BrandFormTemplate, NoteBoxInput, ProductSelfDropBox, FormInputBlackBox],
  templateUrl: './self.html',
  styleUrl: './self.scss',
})
export class ProductSelfFormTemplate extends FormTemplateCommons<ProductSelfTypeExt> {
  override fieldTree = computed(() => this.tree().product);

  setPriceHistory = effect(() => {
    const productPK = this.form.product.pk().value();
    const notes = this.form.product.notes().value();

    this.form.history.product().value.set(productPK);
    this.form.history.notes().value.set(notes);
  });
}
