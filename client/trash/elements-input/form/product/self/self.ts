import { Component, inject } from '@angular/core';
import { Field } from "@angular/forms/signals";
import { HttpProductSelfZ } from '../../../../../components/product/self/self.http';
import { ProductSelfFormTemplate } from "../../../../../templates/forms/product/self/self";
import { iProductSelfExt } from '../../../../../templates/forms/product/self/self.type';
import { FormCommonInput } from '../../../extensions/form-common';
import { FormBlackBox } from "../../black-box/black-box";
import { BrandInput } from "../../public/brand/brand";
import { ProductTypeInput } from "../product-type/product-type";

@Component({
  selector: 'product-self-input',
  imports: [FormBlackBox, ProductSelfFormTemplate, ProductTypeInput, Field, BrandInput],
  templateUrl: './self.html',
  styleUrl: './self.scss',
})
export class ProductSelfInput extends FormCommonInput<iProductSelfExt> {
  override http = inject(HttpProductSelfZ);

  get productTree() {
    return this.tree().product;
  }

  get typeTree() {
    return this.tree().type
  }

  get brandTree() {
    return this.tree().brand
  }
}
