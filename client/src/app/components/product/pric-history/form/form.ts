import { Component, effect, inject, signal } from '@angular/core';
import { form } from '@angular/forms/signals';
import { getProductPriceHistoryInitData, getProductPriceHistoryValues } from '../../../../../data/product-price-history';
import { PRODUCT_PRICE_HISTORY_SCHEMA_EXT } from '../../../../../schemas/product-price-history';
import { BaseFormz } from "../../../../templates/forms/form/form";
import { ProductPriceHistoryFormTemplate } from '../../../../templates/forms/product/price-history/price-history';
import { ProductPriceHistoryType, ProductPriceHistoryTypeExt } from '../../../../types/form/product-price-history';
import { FormCommonProperties } from '../../../extensions/form-common';
import { HttpProductPriceHistoryZ } from '../price-history.http';

@Component({
  selector: 'product-price-history-formz',
  imports: [BaseFormz, ProductPriceHistoryFormTemplate],
  templateUrl: './form.html',
  styleUrl: './form.scss',
})
export class ProductPriceHistoryFormZ extends FormCommonProperties<ProductPriceHistoryTypeExt> {
  override http = inject(HttpProductPriceHistoryZ);
  override modelz = signal<ProductPriceHistoryTypeExt>(
    getProductPriceHistoryInitData()
  );
  override formz = form(this.modelz, PRODUCT_PRICE_HISTORY_SCHEMA_EXT);

  override makeit(): void {
    const values = getProductPriceHistoryValues(this.formz);
    this.structured.set(values);
  }

  getData = effect(() => {
    const data: ProductPriceHistoryType = this.data();
    if (!data) return;

    const history = getProductPriceHistoryInitData({
      history: {
        pk: data.pk,
        amount: data.amount,
        product: data.product,
        notes: data.notes
      }
    });

    this.formz().value.set(history);
  });
}