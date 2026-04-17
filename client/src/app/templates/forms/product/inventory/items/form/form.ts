import { CdkTrapFocus } from '@angular/cdk/a11y';
import { Component, effect, inject, signal } from '@angular/core';
import { form } from '@angular/forms/signals';
import { getProductInventoryItemInitData, getProductInventoryItemValues } from '../../../../../../../data/product-inventory-item';
import { getProductPriceHistoryInitDataOnly } from '../../../../../../../data/product-price-history';
import { getProductSelfInitData } from '../../../../../../../data/product-self';
import { getProductTypeInitData } from '../../../../../../../data/product-type';
import { getBrandInitData } from '../../../../../../../data/public-brand';
import { PRODUCT_INVENTORY_ITEM_SCHEMA_EXT } from '../../../../../../../schemas/product-inventory-item';
import { IconLink } from "../../../../../../elements/buttons/icon-link/icon-link";
import { Icon } from "../../../../../../elements/buttons/icon/icon";
import { NormalButton } from "../../../../../../elements/buttons/normal-button/normal-button";
import { ProductInventoryItemTypeExt } from '../../../../../../types/form/product-inventory-item';
import { ProductInventoryItemTemplate } from "../item/item";
import { ProductInventoryItemsService } from '../items.service';

@Component({
  selector: 'product-inventory-item-form-input',
  imports: [CdkTrapFocus, Icon, IconLink, ProductInventoryItemTemplate, NormalButton],
  templateUrl: './form.html',
  styleUrl: './form.scss',
})
export class ProductInventoryItemFormInput {
  service = inject(ProductInventoryItemsService);

  modelz = signal<ProductInventoryItemTypeExt>(getProductInventoryItemInitData());
  formz = form(this.modelz, PRODUCT_INVENTORY_ITEM_SCHEMA_EXT);

  setInventoryPK = effect(() => {
    const pk = this.service.form().pk().value();
    this.formz.item.inventory().value.set(pk);
  });

  ngOnInit() {
    this.setItem();
  }
  ngOnDestroy() {
    this.service.itemIndex = -1;
  }

  setItem() {
    if (this.service.itemIndex < 0) return;

    const itemDetails = structuredClone(
      this.service.form().item.saves().value()[this.service.itemIndex]
    );

    const type = getProductTypeInitData(itemDetails.product?.type ?? { fresh: false });
    const brand = getBrandInitData(itemDetails.product?.brand ?? { fresh: false });
    const history = getProductPriceHistoryInitDataOnly(itemDetails.product?.history);
    const product = getProductSelfInitData({
      type, brand, history,
      product: itemDetails.product?.product ?? { fresh: false }
    });

    const item = getProductInventoryItemInitData({
      product,
      item: itemDetails.item
    });

    this.formz().value.set(item);
  }

  submit(e: SubmitEvent) {
    e.preventDefault();

    const values = getProductInventoryItemValues(this.formz);
    this.upsert(values);
  }

  upsert(item: any) {
    const items = structuredClone(this.service.items_);
    this.service.itemIndex >= 0
      ? items[this.service.itemIndex] = item
      : items.push(item);

    this.service.form().item.saves().value.set(items);
    this.reset();
  }

  reset() {
    this.formz().reset(
      getProductInventoryItemInitData({
        item: {
          inventory: this.service.form().pk().value()
        }
      })
    )
  }
}
const b = {
  "item": {
    "pk": "019befc0-8c2c-767e-9081-7f6fb5427b1e",
    "quantity": 1,
    "cost": 2,
    "product": "019afe88-3ddc-74a5-a4c0-3ee30d8da684",
    "inventory": "019befc0-8bb0-707c-bed5-f2a90733ad90",
    "notes": ""
  }
}


const a = {
  "product": {
    "product": {
      "pk": "019befb9-be83-75ab-b673-0c44a82df8d2",
      "barcode": null,
      "name": "r",
      "type": "019af884-860e-7c01-927d-bd71626dad63",
      "brand": "019afd5d-73c3-7fdc-82f0-d7657b7e651d",
      "serial": null,
      "model": null,
      "notes": null
    }
  },
  "item": {
    "pk": "019befb9-be83-75ab-b673-131c5557e452",
    "quantity": 1,
    "cost": 4,
    "product": "019befb9-be83-75ab-b673-0c44a82df8d2",
    "inventory": "019befb9-be5c-74a8-a6c0-70b1149ed518",
    "notes": ""
  }
}