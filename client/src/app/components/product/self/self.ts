import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HttpVirtualTable } from "../../../elements/http-virtual-table/http-virtual-table";
import { ComponentListCommonProperties } from '../../extensions/list-commont';
import { HttpProductSelfZ } from './self.http';

@Component({
  selector: 'product-selfz',
  imports: [RouterLink, RouterOutlet, HttpVirtualTable],
  templateUrl: './self.html',
  styleUrl: './self.scss',
})
export class ProductSelfZ extends ComponentListCommonProperties {
  http = inject(HttpProductSelfZ);
}
