import { Component, inject, output } from '@angular/core';
import { FormField } from "@angular/forms/signals";
import { HttpCustomerZ } from '../../../../../components/parties/customer/customer.http';
import { Dropdown } from "../../../../../elements/inputs/dropdown/dropdown";
import { FormDropBoxCommons } from '../../../../extensions/dropbox-common';

@Component({
  selector: 'customer-dropbox',
  imports: [FormField, Dropdown],
  templateUrl: './drop-box.html',
  styleUrl: './drop-box.scss',
})
export class CustomerDropBox extends FormDropBoxCommons {
  override http = inject(HttpCustomerZ);
  left = output<any>();
}
