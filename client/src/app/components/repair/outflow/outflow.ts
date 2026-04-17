import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from "@angular/router";
import { HttpVirtualTable } from "../../../elements/http-virtual-table/http-virtual-table";
import { ComponentListCommonProperties } from '../../extensions/list-commont';
import { HttpRepairOutflowZ } from './outflow.http';

@Component({
  selector: 'repair-outflowz',
  templateUrl: './outflow.html',
  styleUrl: './outflow.scss',
  imports: [RouterLink, RouterOutlet, HttpVirtualTable],
})
export class RepairOutflowZ extends ComponentListCommonProperties {
  override http = inject(HttpRepairOutflowZ);
}
