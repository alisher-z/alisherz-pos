import { Component } from '@angular/core';
import { Filter } from '../../../elements/frames/filter/filter';

@Component({
  selector: 'customer-filter',
  imports: [Filter],
  templateUrl: './filter.html',
  styleUrl: './filter.scss',
})
export class CustomerFilter {}
