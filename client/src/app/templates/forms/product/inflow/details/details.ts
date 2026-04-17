import { Component, effect, input, signal } from '@angular/core';
import { FieldTree, form } from '@angular/forms/signals';
import { getProductInflowDetailInitData, getProductInflowDetailValues } from '../../../../../data/product-inflow-detail';
import { PRODUCT_INFLOW_DETAIL_SCHEMA_EXT } from '../../../../../schemas/product-inflow-detail';
import { ProductInflowType } from '../../../../../types/form/product-inflow';
import { ProductInflowDetailTypeExt } from '../../../../../types/form/product-inflow-details';
import { ProductInflowDetailTemplate } from './detail/detail';

@Component({
  selector: 'product-inflow-details-templatez',
  imports: [ProductInflowDetailTemplate],
  templateUrl: './details.html',
  styleUrl: './details.scss',
})
export class ProductInflowDetailsTemplate {
  tree = input.required<FieldTree<ProductInflowType>>();

  modelz = signal<ProductInflowDetailTypeExt>(getProductInflowDetailInitData());
  formz = form(this.modelz, PRODUCT_INFLOW_DETAIL_SCHEMA_EXT);

  get form() {
    return this.tree();
  }

  setData = effect(() => {
    const inflowPK = this.form.pk().value();
    const outflowPK = this.formz.outflow.outflow.pk().value();
    const customerPK = this.form.customer().value();

    this.formz.detail.inflow().value.set(inflowPK);
    this.formz.detail.outflow().value.set(outflowPK);
    this.formz.outflow.outflow.customer().value.set(customerPK);
  });

  setFormValues = effect(() => {
    const values = getProductInflowDetailValues(this.formz);
    const details = [values];
    this.form.detail.saves().value.set(<any>details);
  });
}
