import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HttpVirtualTable } from "../../../elements/http-virtual-table/http-virtual-table";
import { ComponentListCommonProperties } from '../../extensions/list-commont';
import { HttpVendorZ } from './vendor.http';

@Component({
  selector: 'vendorz',
  imports: [RouterLink, RouterOutlet, HttpVirtualTable],
  templateUrl: './vendor.html',
  styleUrl: './vendor.scss',
})
export class VendorZ extends ComponentListCommonProperties {
  http = inject(HttpVendorZ);
}
