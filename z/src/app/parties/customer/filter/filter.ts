import { Component, effect, model } from '@angular/core';
import { form } from '@angular/forms/signals';
import { Filter } from '../../../elements/frames/filter/filter';
import { SearchFields } from '../../../http/types';
import { CustomerFilterModal, CustomerFilterModalFields } from './modal/modal';

@Component({
  selector: 'customer-filter',
  imports: [Filter, CustomerFilterModal],
  templateUrl: './filter.html',
  styleUrl: './filter.scss',
})
export class CustomerFilter {
  readonly searchFields: SearchFields[] = [
    { label: 'Name', field: 'name' },
    { label: 'Phone', field: 'phone' },
    { label: 'Email', field: 'email' },
    { label: 'ID', field: 'id' },
    { label: 'Address', field: 'address' },
    { label: 'Notes', field: 'notes' },
  ];

  readonly modelz = model<CustomerFilterModalFields>(this.getInitData());
  readonly formz = form(this.modelz);

  private getInitData() {
    return { id: [], name: [], phone: [], email: [], address: [], notes: [] }
  }

  e = effect(() => {
    const form = this.formz().value();
    console.log(form);
  })
}
