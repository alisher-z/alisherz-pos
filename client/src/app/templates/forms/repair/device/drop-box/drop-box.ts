import { Component, effect, inject, input, output } from '@angular/core';
import { FormField } from "@angular/forms/signals";
import { HttpDeviceZ } from '../../../../../components/repair/device/device.http';
import { Dropdown } from "../../../../../elements/inputs/dropdown/dropdown";
import { FormDropBoxCommons } from '../../../../extensions/dropbox-common';

@Component({
  selector: 'device-dropbox',
  imports: [FormField, Dropdown],
  templateUrl: './drop-box.html',
  styleUrl: './drop-box.scss',
})
export class DeviceDropBox extends FormDropBoxCommons {
  constructor() {
    super();
    effect(() => this.http.query['customer'].set(this.customer_pk() ?? ''));
  }
  override http = inject(HttpDeviceZ);
  customer_pk = input<string | null>(null);
  left = output<any>();
}
