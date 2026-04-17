import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from "@angular/router";
import { HttpVirtualTable } from "../../../elements/http-virtual-table/http-virtual-table";
import { ComponentListCommonProperties } from '../../extensions/list-commont';
import { HttpProductTypeZ } from './product-teyp.http';

@Component({
  selector: 'product-typez',
  imports: [RouterLink, RouterOutlet, HttpVirtualTable],
  templateUrl: './product-type.html',
  styleUrl: './product-type.scss',
})
export class ProductTypez extends ComponentListCommonProperties {
  http = inject(HttpProductTypeZ);
}
