import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from "@angular/router";
import { HttpVirtualTable } from "../../../elements/http-virtual-table/http-virtual-table";
import { ComponentListCommonProperties } from '../../extensions/list-commont';
import { HttpProductInflowZ } from './inflow.http';

@Component({
  selector: 'product-inflowz',
  imports: [RouterLink, RouterOutlet, HttpVirtualTable],
  templateUrl: './inflow.html',
  styleUrl: './inflow.scss',
})
export class ProductInflowZ extends ComponentListCommonProperties {
  override http = inject(HttpProductInflowZ);
}
