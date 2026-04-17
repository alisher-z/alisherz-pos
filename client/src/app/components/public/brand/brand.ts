import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HttpVirtualTable } from "../../../elements/http-virtual-table/http-virtual-table";
import { ComponentListCommonProperties } from '../../extensions/list-commont';
import { HttpBrandZ } from './brand.http';

@Component({
  selector: 'brandz',
  imports: [RouterOutlet, RouterLink, HttpVirtualTable],
  templateUrl: './brand.html',
  styleUrl: './brand.scss',
})
export class BrandZ extends ComponentListCommonProperties {
  http = inject(HttpBrandZ);
}
