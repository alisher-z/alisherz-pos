import { Component, inject } from '@angular/core';
import { HttpCustomerZ } from '../../../../../components/parties/customer/customer.http';
import { CustomerFormTemplate } from "../../../../../templates/forms/parties/customer/customer";
import { iCustomer } from '../../../../../templates/forms/parties/customer/customer.type';
import { FormCommonInput } from '../../../extensions/form-common';
import { FormBlackBox } from "../../black-box/black-box";

@Component({
  selector: 'customer-input',
  imports: [FormBlackBox, CustomerFormTemplate],
  templateUrl: './customer.html',
  styleUrl: './customer.scss',
})
export class CustomerInput extends FormCommonInput<iCustomer> {
  override http = inject(HttpCustomerZ);
}
