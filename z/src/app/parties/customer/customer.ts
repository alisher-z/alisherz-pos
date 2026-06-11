import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListFrame } from '../../elements/frames/list/list';
import { CustomerBridge } from './customer.bridge';
import { CustomerFilter } from './filter/filter';

@Component({
  selector: 'customer',
  templateUrl: './customer.html',
  styleUrl: './customer.scss',
  imports: [RouterOutlet, ListFrame, CustomerFilter],
  providers: [CustomerBridge],
})
export class Customer {
  bridge = inject(CustomerBridge);
}
