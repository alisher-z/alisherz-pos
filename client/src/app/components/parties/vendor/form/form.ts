import { Component, effect, inject, signal } from '@angular/core';
import { form } from '@angular/forms/signals';
import { getVendorInitData, getVendorValues, VENDOR_INITIAL_DATA } from '../../../../data/party-vendor';
import { VENDOR_SCHEMA } from '../../../../schemas/party-vendor';
import { BaseFormz } from "../../../../templates/forms/form/form";
import { VendorFormTemplate } from "../../../../templates/forms/parties/vendor/vendor";
import { VendorType } from '../../../../types/form/party-vendor';
import { FormCommonProperties } from '../../../extensions/form-common';
import { HttpVendorZ } from '../vendor.http';

@Component({
  selector: 'vendor-formz',
  imports: [BaseFormz, VendorFormTemplate],
  templateUrl: './form.html',
  styleUrl: './form.scss',
})
export class VendorFormZ extends FormCommonProperties<VendorType> {
  override http = inject(HttpVendorZ);
  override modelz = signal<VendorType>(VENDOR_INITIAL_DATA);
  override formz = form(this.modelz, VENDOR_SCHEMA);

  override makeit(): void {
    const values = getVendorValues(this.formz);
    this.structured.set(values);
  }

  getData = effect(() => {
    const data: VendorType = this.data();
    if (!data) return;

    const vendor = getVendorInitData({
      pk: data.pk,
      id: data.id,
      name: data.name,
      phone: data.phone,
      email: data.email,
      address: data.address,
      notes: data.notes,
      active: data.active
    });

    this.formz().value.set(vendor);
  })
}
