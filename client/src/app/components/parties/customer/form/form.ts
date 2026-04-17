import { Component, effect, inject, signal } from '@angular/core';
import { form } from '@angular/forms/signals';
import { CUSTOMER_INITIAL_DATA, getCustomerInitData, getCustomerValues } from '../../../../../data/party-customer';
import { CUSTOMER_SCHEMA } from '../../../../../schemas/party-customer';
import { BaseFormz } from "../../../../templates/forms/form/form";
import { CustomerFormTemplate } from '../../../../templates/forms/parties/customer/customer';
import { CustomerType } from '../../../../types/form/party-customer';
import { FormCommonProperties } from '../../../extensions/form-common';
import { HttpCustomerZ } from '../customer.http';

@Component({
  selector: 'customer-formz',
  imports: [BaseFormz, CustomerFormTemplate],
  templateUrl: './form.html',
  styleUrl: './form.scss',
})
export class CustomerFormz extends FormCommonProperties<CustomerType> {
  override http = inject(HttpCustomerZ);
  override modelz = signal<CustomerType>(CUSTOMER_INITIAL_DATA);
  override formz = form(this.modelz, CUSTOMER_SCHEMA);

  override makeit(): void {
    const values = getCustomerValues(this.formz);
    this.structured.set(values);
  }

  getData = effect(() => {
    const data: CustomerType = this.data();
    if (!data) return;

    const customer = getCustomerInitData({
      pk: data.pk,
      id: data.id,
      name: data.name,
      phone: data.phone,
      email: data.email,
      address: data.address,
      notes: data.notes,
      active: data.active
    });

    this.formz().value.set(customer);
  });
}
