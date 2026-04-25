import { Component, effect, inject } from '@angular/core';
import { HttpVirtualTable } from '../../../../elements/tables/http-virtual-table/http-virtual-table';
import { CustomerBridge } from '../../customer.bridge';

@Component({
  selector: 'customer-list',
  imports: [HttpVirtualTable],
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class CustomerList {
  bridge = inject(CustomerBridge);
  constructor() {
    effect(() => console.log(this.bridge.customers()));
  }
}
