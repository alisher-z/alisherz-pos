import { Component, effect, inject, signal } from '@angular/core';
import { form } from '@angular/forms/signals';
import { getProductInventoryInitData, getProductInventoryValues } from '../../../../data/product-inventory';
import { PRODUCT_INVENTORY_SCHEMA_EXT } from '../../../../schemas/product-inventory';
import { BaseFormz } from "../../../../templates/forms/form/form";
import { ProductInventoryFormTemplate } from "../../../../templates/forms/product/inventory/inventory";
import { ProductInventoryItemsTemplate } from "../../../../templates/forms/product/inventory/items/items";
import { ProductInventoryTypeExt } from '../../../../types/form/product-inventory';
import { FormCommonProperties } from '../../../extensions/form-common';
import { HttpProductInventoryZ } from '../inventory.http';

@Component({
  selector: 'product-inventory-formz',
  imports: [BaseFormz, ProductInventoryFormTemplate, ProductInventoryItemsTemplate],
  templateUrl: './form.html',
  styleUrl: './form.scss',
})
export class ProductInventoryFormZ extends FormCommonProperties<ProductInventoryTypeExt> {
  override http = inject(HttpProductInventoryZ);
  override modelz = signal<ProductInventoryTypeExt>(getProductInventoryInitData());
  override formz = form(this.modelz, PRODUCT_INVENTORY_SCHEMA_EXT);

  override makeit(): void {
    const values = getProductInventoryValues(this.formz);
    this.structured.set(values);
  }

  setData = effect(() => {
    const data = this.data();
    if (!data) return;

    // const items: any[] = [];

    // for (const item of data.items)
    //   items.push({ item });

    const inventory = getProductInventoryInitData({
      inventory: {
        pk: data.pk,
        id: data.id,
        date: new Date(data.date),
        vendor: data.vendor,
        notes: data.notes
      }
    });

    this.formz().value.set(inventory);
  });
}