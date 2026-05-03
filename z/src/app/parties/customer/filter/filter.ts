import { Component } from '@angular/core';
import { Filter } from '../../../elements/frames/filter/filter';
import { SearchFields } from '../../../http/types';

@Component({
  selector: 'customer-filter',
  imports: [Filter],
  templateUrl: './filter.html',
  styleUrl: './filter.scss',
})
export class CustomerFilter {
  searchFields: SearchFields[] = [
    { label: 'Name', field: 'name' },
    { label: 'Phone', field: 'phone' },
    { label: 'Email', field: 'email' },
    { label: 'ID', field: 'id' },
    { label: 'Address', field: 'address' },
    { label: 'Notes', field: 'notes' },
  ];
}
