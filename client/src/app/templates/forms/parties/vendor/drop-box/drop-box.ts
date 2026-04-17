import { Component, inject } from '@angular/core';
import { FormField } from "@angular/forms/signals";
import { HttpVendorZ } from '../../../../../components/parties/vendor/vendor.http';
import { ComboBox } from "../../../../../elements/inputs/combo-box/combo-box";
import { FormDropBoxCommons } from '../../../../extensions/dropbox-common';

@Component({
  selector: 'vendor-dropbox',
  imports: [FormField, ComboBox],
  templateUrl: './drop-box.html',
  styleUrl: './drop-box.scss',
})
export class VendorDropBox extends FormDropBoxCommons {
  override http = inject(HttpVendorZ);
}
