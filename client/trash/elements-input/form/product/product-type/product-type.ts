import { Component, inject } from '@angular/core';
import { HttpProductTypeZ } from '../../../../../components/product/product-type/product-teyp.http';
import { ProductTypeFormTemplate } from '../../../../../templates/forms/product/product-type/product-type';
import { iProductType } from '../../../../../templates/forms/product/product-type/product-type.type';
import { FormCommonInput } from '../../../extensions/form-common';
import { FormBlackBox } from '../../black-box/black-box';

@Component({
  selector: 'product-type-input',
  imports: [ProductTypeFormTemplate, FormBlackBox],
  templateUrl: './product-type.html',
  styleUrl: './product-type.scss',
})
export class ProductTypeInput extends FormCommonInput<iProductType> {
  override http = inject(HttpProductTypeZ);
}
