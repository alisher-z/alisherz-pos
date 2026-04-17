import { Component, computed, input, output } from '@angular/core';
import { FormField } from "@angular/forms/signals";
import { NoteBoxInput } from "../../../../elements/inputs/note-box/note-box";
import { TextBoxInput } from "../../../../elements/inputs/text-box/text-box";
import { DeviceTypeExt } from '../../../../types/form/repair-device';
import { FormTemplateCommons } from '../../../extensions/template-common';
import { FormInputBlackBox } from "../../black-box/black-box";
import { CustomerFormTemplate } from "../../parties/customer/customer";
import { BrandFormTemplate } from "../../public/brand/brand";
import { DeviceDropBox } from "./drop-box/drop-box";

@Component({
  selector: 'device-form-templatez',
  imports: [FormInputBlackBox, BrandFormTemplate, CustomerFormTemplate, TextBoxInput, FormField, NoteBoxInput, DeviceDropBox],
  templateUrl: './device.html',
  styleUrl: './device.scss',
})
export class DeviceFormTemplate extends FormTemplateCommons<DeviceTypeExt> {
  override fieldTree = computed(() => this.tree().device);
  customer_pk = input<string | null>(null);
  drop_left = output<any>();
}
