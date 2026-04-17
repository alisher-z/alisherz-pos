import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from "@angular/router";
import { HttpVirtualTable } from "../../../elements/http-virtual-table/http-virtual-table";
import { ComponentListCommonProperties } from '../../extensions/list-commont';
import { HttpProductInventoryZ } from './inventory.http';

@Component({
  selector: 'product-inventoryz',
  imports: [RouterLink, RouterOutlet, HttpVirtualTable],
  templateUrl: './inventory.html',
  styleUrl: './inventory.scss',
})
export class ProductInventoryZ extends ComponentListCommonProperties {
  override http = inject(HttpProductInventoryZ);
}
