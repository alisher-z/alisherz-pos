import { Component, inject } from '@angular/core';
import { FieldTree, FormField } from '@angular/forms/signals';
import { TextFilter } from '../../../../elements/inputs/text-filter/text-filter';
import { CustomerFilterFields, CustomerFilterStructure } from '../../utils/filter';

@Component({
  selector: 'customer-filter-modal',
  imports: [TextFilter, FormField],
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
})
export class CustomerFilterModal {
  structure = inject(CustomerFilterStructure);
  form: FieldTree<CustomerFilterFields, string | number>;

  constructor() {
    this.form = this.structure.form;
  }
}