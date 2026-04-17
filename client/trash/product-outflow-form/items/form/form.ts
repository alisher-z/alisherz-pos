import { CdkTrapFocus } from '@angular/cdk/a11y';
import { Component, effect, inject, signal } from '@angular/core';
import { form, submit } from '@angular/forms/signals';
import { getProductOutflowItemInitData, getProductOutflowItemValues } from '../../../../../../../data/product-outflow-item';
import { PRODUCT_OUTFLOW_ITEM_SCHEMA } from '../../../../../../../schemas/product-outflow-item';
import { IconLink } from "../../../../../../elements/buttons/icon-link/icon-link";
import { Icon } from "../../../../../../elements/buttons/icon/icon";
import { NormalButton } from "../../../../../../elements/buttons/normal-button/normal-button";
import { ProductOutflowItemTemplate } from '../../../../../../elements/inputs/form-templates/product/outflow/item/item';
import { ProductOutflowItemType } from '../../../../../../types/form/product-outflow-item';
import { ProductOutflowItemsService } from '../items.service';

@Component({
  selector: 'product-outflow-item-formz',
  imports: [ProductOutflowItemTemplate, CdkTrapFocus, Icon, IconLink, NormalButton],
  templateUrl: './form.html',
  styleUrl: './form.scss',
})
export class ProductOutflowItemFormz {
  service = inject(ProductOutflowItemsService);
  modelz = signal<ProductOutflowItemType>(getProductOutflowItemInitData());
  formz = form(this.modelz, PRODUCT_OUTFLOW_ITEM_SCHEMA);


  setItem = effect(() => {
    const item = this.service.item();
    if (!item) return;

    this.modelz.set({ ...item, fresh: true });
  })


  ngOnInit() {
    this.formz.outflow().setControlValue(this.service.primaryKey_);
  }
  ngOnDestroy() {
    this.service.itemPK.set(null);
  }

  upsert(item: any) {
    const items = structuredClone(this.service.items_);
    const index = items.findIndex(i => i.pk === this.service.itemPK());
    index >= 0
      ? items[index] = item
      : items.push(item);

    this.service.itemsTree().setControlValue(items);
    this.reset();
  }

  submit(e: SubmitEvent) {
    e.preventDefault();
    submit(this.formz, async () => {
      const values = getProductOutflowItemValues(this.formz);
      this.upsert(values);
    });
  }

  reset() {
    this.formz()
      .reset(
        getProductOutflowItemInitData({
          outflow: this.service.primaryKey_
        }));
  }
}
