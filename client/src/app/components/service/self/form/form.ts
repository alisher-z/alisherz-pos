import { Component, effect, inject, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { getServiceSelfInitData, getServiceSelfValue } from '../../../../data/service-self';
import { NumberBoxInput } from "../../../../elements/inputs/number-box/number-box";
import { SERVICE_SELF_SCHEMA_EXT } from '../../../../schemas/service-self';
import { BaseFormz } from "../../../../templates/forms/form/form";
import { ServiceSelfTemplate } from "../../../../templates/forms/service/self/self";
import { ServiceSelfTypeExt } from '../../../../types/form/service-self';
import { FormCommonProperties } from '../../../extensions/form-common';
import { HttpServiceSelfZ } from '../self.http';

@Component({
  selector: 'service-self-formz',
  imports: [BaseFormz, ServiceSelfTemplate, NumberBoxInput, FormField],
  templateUrl: './form.html',
  styleUrl: './form.scss',
})
export class ServiceSelfFormZ extends FormCommonProperties<ServiceSelfTypeExt> {
  override http = inject(HttpServiceSelfZ);
  override modelz = signal<ServiceSelfTypeExt>(getServiceSelfInitData());
  override formz = form(this.modelz, SERVICE_SELF_SCHEMA_EXT);

  override makeit(): void {
    const values = getServiceSelfValue(this.formz);
    this.structured.set(values);
  }

  setData = effect(() => {
    const data = this.data();
    if (!data) return;

    const self = getServiceSelfInitData({
      service: {
        pk: data.pk,
        id: data.id,
        name: data.name,
        notes: data.notes
      },

      history: !data.price
        ? undefined
        : {
          pk: data.price.pk,
          service: data.pk,
          amount: data.price.amount
        }
    });

    this.formz().value.set(self);
  })
}