import { Component, effect, inject, signal } from '@angular/core';
import { form } from '@angular/forms/signals';
import { getDeviceInitData, getDeviceValues } from '../../../../../data/repair-device';
import { DEVICE_SCHEMA_EXT } from '../../../../../schemas/repair-device';
import { BaseFormz } from "../../../../templates/forms/form/form";
import { DeviceFormTemplate } from "../../../../templates/forms/repair/device/device";
import { DeviceTypeExt } from '../../../../types/form/repair-device';
import { FormCommonProperties } from '../../../extensions/form-common';
import { HttpDeviceZ } from '../device.http';

@Component({
  selector: 'device-formz',
  imports: [BaseFormz, DeviceFormTemplate],
  templateUrl: './form.html',
  styleUrl: './form.scss',
})
export class DeviceFormZ extends FormCommonProperties<DeviceTypeExt> {
  override http = inject(HttpDeviceZ);
  override modelz = signal<DeviceTypeExt>(getDeviceInitData());
  override formz = form(this.modelz, DEVICE_SCHEMA_EXT);


  override makeit(): void {
    const values = getDeviceValues(this.formz);
    this.structured.set(values);
  }

  setData = effect(() => {
    const data = this.data();
    if (!data) return;

    const device = getDeviceInitData({
      device: {
        pk: data.pk,
        brand: data.brand,
        customer: data.customer,
        model: data.model,
        serial: data.serial,
        notes: data.notes
      }
    });

    this.formz().value.set(device);
  })
}
