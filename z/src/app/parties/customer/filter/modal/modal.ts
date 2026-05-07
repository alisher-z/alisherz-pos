import { Component, input } from '@angular/core';
import { FieldTree, FormField } from '@angular/forms/signals';
import { TextFilter } from '../../../../elements/inputs/text-filter/text-filter';

@Component({
  selector: 'customer-filter-modal',
  imports: [TextFilter, FormField],
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
})
export class CustomerFilterModal {
  form = input.required<FieldTree<CustomerFilterModalFields, string | number>>();
}

export interface CustomerFilterModalFields {
  id: string[];
  name: string[];
  phone: string[];
  email: string[];
  address: string[];
  notes: string[];
}
