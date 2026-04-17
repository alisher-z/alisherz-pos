import { CdkTrapFocus } from '@angular/cdk/a11y';
import { Component, effect, inject, signal, untracked } from '@angular/core';
import { form } from '@angular/forms/signals';
import { getProductOutflowItemInitData, getProductOutflowItemValues } from '../../../../../../data/product-outflow-item';
import { IconLink } from '../../../../../../elements/buttons/icon-link/icon-link';
import { Icon } from '../../../../../../elements/buttons/icon/icon';
import { NormalButton } from '../../../../../../elements/buttons/normal-button/normal-button';
import { PRODUCT_OUTFLOW_ITEM_SCHEMA } from '../../../../../../schemas/product-outflow-item';
import { ProductOutflowItemType } from '../../../../../../types/form/product-outflow-item';
import { ProductOutflowItemTemplate } from '../item/item';
import { ProductOutflowItemsService } from '../items.service';

@Component({
  selector: 'product-outflow-item-form-template',
  imports: [CdkTrapFocus, Icon, IconLink, ProductOutflowItemTemplate, NormalButton],
  templateUrl: './form.html',
  styleUrl: './form.scss',
})
export class ProductOutflowItemFormInput {
  service = inject(ProductOutflowItemsService);

  modelz = signal<ProductOutflowItemType>(getProductOutflowItemInitData());
  // modelz = signal<ProductOutflowItemType>(this.getInitData());
  formz = form(this.modelz, PRODUCT_OUTFLOW_ITEM_SCHEMA);

  setOutflowPK = effect(() => this.formz.outflow().value.set(
    this.service.form().outflow.pk().value()
  ));

  ngOnInit() {
    // setTimeout(() => {
    this.setItem();
    // }, 10);
  }
  ngOnDestroy() {
    this.service.itemIndex = -1;
  }

  setItem() {
    if (this.service.itemIndex < 0) return;
    // console.log(this.service.form().outflow.item.saves().value()[this.service.itemIndex]);
    const item = getProductOutflowItemInitData(
      structuredClone(
        this.service.form().outflow.item.saves().value()[this.service.itemIndex]
      )
    );

    // this.modelz.set(item);
    this.formz().value.set(item);
  }

  getInitData() {
    const index = this.service.itemIndex;
    const items = structuredClone(
      untracked(this.service.form().outflow.item.saves().value)
    );

    const item = getProductOutflowItemInitData(index < 0 ? undefined : items[index]);
    console.log(items);
    console.log(index);
    console.log(item);
    return item;
  }

  submit(e: SubmitEvent) {
    e.preventDefault();

    const values = getProductOutflowItemValues(this.formz);
    this.upsert(values);
  }

  upsert(item: any) {
    const items = structuredClone(this.service.items_);
    this.service.itemIndex >= 0
      ? items[this.service.itemIndex] = item
      : items.push(item);

    this.service.form().outflow.item.saves().value.set(items);
    this.reset();
  }

  reset() {
    this.formz().reset(
      getProductOutflowItemInitData({
        outflow: this.service.form().outflow.pk().value()
      })
    );
    this.service.itemIndex = -1;
  }

  // e = effect(() => console.log(this.formz().value()));
}
