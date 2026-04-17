import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from "@angular/router";
import { HttpVirtualTable } from "../../../elements/http-virtual-table/http-virtual-table";
import { ComponentListCommonProperties } from '../../extensions/list-commont';
import { HttpProductPriceHistoryZ } from './price-history.http';

@Component({
  selector: 'product-pric-historyz',
  imports: [RouterLink, RouterOutlet, HttpVirtualTable],
  templateUrl: './price-history.html',
  styleUrl: './price-history.scss',
})
export class ProductPriceHistoryZ extends ComponentListCommonProperties {
  override http = inject(HttpProductPriceHistoryZ);
}
