import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from "@angular/router";
import { HttpVirtualTable } from "../../../elements/http-virtual-table/http-virtual-table";
import { ComponentListCommonProperties } from '../../extensions/list-commont';
import { HttpProductOutlfowZ } from './outflow.http';

@Component({
  selector: 'product-outflowz',
  imports: [RouterLink, RouterOutlet, HttpVirtualTable],
  templateUrl: './outflow.html',
  styleUrl: './outflow.scss',
})
export class ProductOutflowZ extends ComponentListCommonProperties {
  override http = inject(HttpProductOutlfowZ);
  // e = effect(() => console.log(this.http.list.value()));

}
