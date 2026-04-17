import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from "@angular/router";
import { HttpVirtualTable } from "../../../elements/http-virtual-table/http-virtual-table";
import { ComponentListCommonProperties } from '../../extensions/list-commont';
import { HttpServiceSelfZ } from './self.http';

@Component({
  selector: 'service-selfz',
  imports: [RouterLink, RouterOutlet, HttpVirtualTable],
  templateUrl: './self.html',
  styleUrl: './self.scss',
})
export class ServiceSelfZ extends ComponentListCommonProperties {
  override http = inject(HttpServiceSelfZ);
}
