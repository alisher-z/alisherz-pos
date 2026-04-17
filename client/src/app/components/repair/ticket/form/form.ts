import { Component, effect, inject, signal } from '@angular/core';
import { form } from '@angular/forms/signals';
import { getTicketInitData, getTicketValues } from '../../../../../data/repair-ticket';
import { TICKET_SCHEMA_EXT } from '../../../../../schemas/repair-ticket';
import { BaseFormz } from "../../../../templates/forms/form/form";
import { TicketFormTemplate } from "../../../../templates/forms/repair/ticket/ticket";
import { TicketTypeExt } from '../../../../types/form/repair-ticket';
import { FormCommonProperties } from '../../../extensions/form-common';
import { HttpTicketZ } from '../ticket.http';

@Component({
  selector: 'ticket-formz',
  imports: [BaseFormz, TicketFormTemplate],
  templateUrl: './form.html',
  styleUrl: './form.scss',
})
export class TicketFormZ extends FormCommonProperties<TicketTypeExt> {
  override http = inject(HttpTicketZ);
  override modelz = signal<TicketTypeExt>(getTicketInitData());
  override formz = form(this.modelz, TICKET_SCHEMA_EXT);

  override makeit(): void {
    const values = getTicketValues(this.formz);
    this.structured.set(values);
  }

  setData = effect(() => {
    const data = this.data();
    if (!data) return;

    const ticket = getTicketInitData({
      ticket: {
        pk: data.pk,
        id: data.id,
        customer: data.customer,
        date: new Date(data.date),
        device: data.device,
        estimated: data.estimated,
        problem: data.problem
      }
    });

    this.formz().value.set(ticket);
  })
}