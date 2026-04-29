import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListFrame } from '../../elements/frames/list/list';
import { CustomerBridge } from './customer.bridge';

@Component({
  selector: 'customer',
  templateUrl: './customer.html',
  styleUrl: './customer.scss',
  imports: [RouterOutlet, ListFrame],
  providers: [CustomerBridge],
})
export class Customer {
  bridge = inject(CustomerBridge);
}
