import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from "@angular/router";
import { HttpVirtualTable } from "../../../elements/http-virtual-table/http-virtual-table";
import { ComponentListCommonProperties } from '../../extensions/list-commont';
import { HttpTicketZ } from './ticket.http';

@Component({
  selector: 'ticketz',
  imports: [RouterLink, RouterOutlet, HttpVirtualTable],
  templateUrl: './ticket.html',
  styleUrl: './ticket.scss',
})
export class TicketZ extends ComponentListCommonProperties {
  override http = inject(HttpTicketZ);
}
