import { Component, effect, inject, signal } from '@angular/core';
import { form } from '@angular/forms/signals';
import { getProductTypeInitData, getProductTypeValues } from '../../../../../data/product-type';
import { PRODUCT_TYPE_SCHEMA } from '../../../../../schemas/product-type';
import { BaseFormz } from "../../../../templates/forms/form/form";
import { ProductTypeFormTemplate } from '../../../../templates/forms/product/product-type/product-type';
import { ProductTypeType } from '../../../../types/form/product-type';
import { FormCommonProperties } from '../../../extensions/form-common';
import { HttpProductTypeZ } from '../product-teyp.http';

@Component({
  selector: 'product-type-formz',
  imports: [BaseFormz, ProductTypeFormTemplate],
  templateUrl: './form.html',
  styleUrl: './form.scss',
})
export class ProductTypeFormZ extends FormCommonProperties<ProductTypeType> {
  override http = inject(HttpProductTypeZ);
  override modelz = signal<ProductTypeType>(getProductTypeInitData());
  override formz = form(this.modelz, PRODUCT_TYPE_SCHEMA);

  override makeit(): void {
    const values = getProductTypeValues(this.formz);
    this.structured.set(values);
  }

  getData = effect(() => {
    const data: ProductTypeType = this.data();
    if (!data) return;

    const type = getProductTypeInitData({
      pk: data.pk,
      name: data.name,
      notes: data.notes,
      active: data.active
    });

    this.formz().value.set(type);
  });
}
