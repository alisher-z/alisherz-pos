import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HttpVirtualTable } from "../../../elements/http-virtual-table/http-virtual-table";
import { ComponentListCommonProperties } from '../../extensions/list-commont';
import { HttpCustomerZ } from './customer.http';

@Component({
  selector: 'customerz',
  imports: [RouterOutlet, RouterLink, HttpVirtualTable],
  templateUrl: './customer.html',
  styleUrl: './customer.scss',
})
export class Customerz extends ComponentListCommonProperties {
  http = inject(HttpCustomerZ);
}
