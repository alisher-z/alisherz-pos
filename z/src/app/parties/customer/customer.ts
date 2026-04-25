import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CustomerBridge } from './customer.bridge';

@Component({
  selector: 'customer',
  templateUrl: './customer.html',
  styleUrl: './customer.scss',
  imports: [RouterOutlet],
  providers: [CustomerBridge],
})
export class Customer {
  bridge = inject(CustomerBridge);
}
