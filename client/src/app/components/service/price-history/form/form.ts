import { Component, effect, inject, signal } from '@angular/core';
import { form } from '@angular/forms/signals';
import { getServicePriceHistoryInitData, getServicePriceHistoryValues } from '../../../../data/service-price-history';
import { SERVICE_PRICE_HISTORY_SCHEMA_EXT } from '../../../../schemas/service-price-history';
import { BaseFormz } from "../../../../templates/forms/form/form";
import { ServicePriceHistoryFormTemplate } from "../../../../templates/forms/service/price-history/price-history";
import { ServicePriceHistoryTypeExt } from '../../../../types/form/service-price-history';
import { FormCommonProperties } from '../../../extensions/form-common';
import { HttpServicePriceHistory } from '../price-history.http';

@Component({
  selector: 'service-price-history-formz',
  imports: [BaseFormz, ServicePriceHistoryFormTemplate],
  templateUrl: './form.html',
  styleUrl: './form.scss',
})
export class ServicePriceHistoryFormZ extends FormCommonProperties<ServicePriceHistoryTypeExt> {
  override http = inject(HttpServicePriceHistory);
  override modelz = signal<ServicePriceHistoryTypeExt>(getServicePriceHistoryInitData());
  override formz = form(this.modelz, SERVICE_PRICE_HISTORY_SCHEMA_EXT);

  override makeit(): void {
    const values = getServicePriceHistoryValues(this.formz);
    this.structured.set(values);
  }

  setData = effect(() => {
    const data = this.data();
    if (!data) return;

    const history = getServicePriceHistoryInitData({
      history: {
        pk: data.pk,
        service: data.service,
        amount: data.amount
      }
    });

    this.formz().value.set(history);
  })
}
