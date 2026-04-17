import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from "@angular/router";
import { HttpVirtualTable } from "../../../elements/http-virtual-table/http-virtual-table";
import { ComponentListCommonProperties } from '../../extensions/list-commont';
import { HttpDeviceZ } from './device.http';

@Component({
  selector: 'devicez',
  imports: [RouterLink, RouterOutlet, HttpVirtualTable],
  templateUrl: './device.html',
  styleUrl: './device.scss',
})
export class DeviceZ extends ComponentListCommonProperties {
  override http = inject(HttpDeviceZ);
}
