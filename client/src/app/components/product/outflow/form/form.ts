import { Component, effect, inject, signal } from '@angular/core';
import { form } from '@angular/forms/signals';
import { PRODUCT_OUTFLOW_SCHEMA_EXT } from '../../../../../schemas/product-outflow';
import { getProductOutflowInitData, getProductOutflowValues } from '../../../../data/product-outflow';
import { BaseFormz } from "../../../../templates/forms/form/form";
import { ProductOutflowItemsTemplate } from '../../../../templates/forms/product/outflow/items/items';
import { ProductOutflowFormTemplate } from '../../../../templates/forms/product/outflow/outflow';
import { ProductOutflowAPIType } from '../../../../types/api/product-outflow';
import { ProductOutflowTypeExt } from '../../../../types/form/product-outflow';
import { FormCommonProperties } from '../../../extensions/form-common';
import { HttpProductOutlfowZ } from '../outflow.http';

@Component({
  selector: 'product-outflow-formz',
  templateUrl: './form.html',
  styleUrl: './form.scss',
  imports: [BaseFormz, ProductOutflowFormTemplate, ProductOutflowItemsTemplate],
})
export class ProductOutflowFormZ extends FormCommonProperties<ProductOutflowTypeExt> {
  http = inject(HttpProductOutlfowZ);
  modelz = signal<ProductOutflowTypeExt>(getProductOutflowInitData());
  formz = form(this.modelz, PRODUCT_OUTFLOW_SCHEMA_EXT);

  getData = effect(() => {
    const data: ProductOutflowAPIType = this.data();
    if (!data) return;

    const outflow = getProductOutflowInitData({
      outflow: {
        pk: data.pk,
        id: data.id,
        date: new Date(data.date),
        customer: data.customer,
        notes: data.notes,
        item: {
          saves: <any>data.items,
          deletes: []
        }
      }
    });

    this.formz().value.set(outflow);
  })

  makeit(): void {
    const values = getProductOutflowValues(this.formz);
    this.structured.set(values);
  }
}
