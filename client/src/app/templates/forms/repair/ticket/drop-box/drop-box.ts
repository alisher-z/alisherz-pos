import { Component, computed, inject } from '@angular/core';
import { FormField } from "@angular/forms/signals";
import { HttpTicketZ } from '../../../../../components/repair/ticket/ticket.http';
import { DropBoxInput } from "../../../../../elements/inputs/drop-box/drop-box";
import { FormDropBoxCommons } from '../../../../extensions/dropbox-common';

@Component({
  selector: 'ticket-dropbox',
  imports: [DropBoxInput, FormField],
  templateUrl: './drop-box.html',
  styleUrl: './drop-box.scss',
})
export class TicketDropBox extends FormDropBoxCommons {
  override http = inject(HttpTicketZ);

  #tickets = computed(() => {
    const values = this.http.chunks();
    if (!values) return undefined;

    const tickets: any[] = [];
    for (const v of values) {
      v.name = v.device.brand.name;
      tickets.push(v);
    }

    return tickets;
  });

  override get list(): any {
    return this.#tickets();
  }
}
