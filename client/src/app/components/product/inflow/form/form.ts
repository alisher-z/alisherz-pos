import { Component, effect, inject, signal } from '@angular/core';
import { form } from '@angular/forms/signals';
import { PRODUCT_INFLOW_SCHEMA_EXT } from '../../../../../schemas/product-inflow';
import { getProductInflowInitData, getProductInflowValues } from '../../../../data/product-inflow';
import { BaseFormz } from "../../../../templates/forms/form/form";
import { ProductInflowDetailsTemplate } from "../../../../templates/forms/product/inflow/details/details";
import { ProductInflowFormTemplate } from "../../../../templates/forms/product/inflow/inflow";
import { ProductInflowTypeExt } from '../../../../types/form/product-inflow';
import { FormCommonProperties } from '../../../extensions/form-common';
import { HttpProductInflowZ } from '../inflow.http';

@Component({
  selector: 'product-inflow-formz',
  imports: [BaseFormz, ProductInflowFormTemplate, ProductInflowDetailsTemplate],
  templateUrl: './form.html',
  styleUrl: './form.scss',
})
export class ProductInflowFormZ extends FormCommonProperties<ProductInflowTypeExt> {
  override http = inject(HttpProductInflowZ);
  override modelz = signal<ProductInflowTypeExt>(getProductInflowInitData());
  override formz = form(this.modelz, PRODUCT_INFLOW_SCHEMA_EXT);


  override makeit(): void {
    const values = getProductInflowValues(this.formz);
    console.log(values);
    this.structured.set(values);
  }

  getData = effect(() => {
    const data = this.data();
    console.log(data);
  })
}
