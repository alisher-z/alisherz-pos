import { Component, inject } from '@angular/core';
import { Field } from "@angular/forms/signals";
import { HttpCustomerZ } from '../../../../../../components/parties/customer/customer.http';
import { DropBoxInput } from "../../../../drop-box/drop-box";
import { FormDropdownCommons } from '../../../extensions/dropdown.common';

@Component({
  selector: 'customer-dropdown',
  imports: [DropBoxInput, Field],
  templateUrl: './dropdown.html',
  styleUrl: './dropdown.scss',
})
export class CustomerDropdown extends FormDropdownCommons {
  override http = inject(HttpCustomerZ);
}
