import { Component, computed, effect } from '@angular/core';
import { FormField } from "@angular/forms/signals";
import { v7 } from 'uuid';
import { DateBoxInput } from "../../../../elements/inputs/date-box/date-box";
import { NoteBoxInput } from "../../../../elements/inputs/note-box/note-box";
import { NumberBoxInput } from "../../../../elements/inputs/number-box/number-box";
import { TextBoxInput } from "../../../../elements/inputs/text-box/text-box";
import { TicketTypeExt } from '../../../../types/form/repair-ticket';
import { FormTemplateCommons } from '../../../extensions/template-common';
import { FormInputBlackBox } from "../../black-box/black-box";
import { CustomerDropBox } from "../../parties/customer/drop-box/drop-box";
import { DeviceFormTemplate } from "../device/device";
import { TicketDropBox } from "./drop-box/drop-box";

@Component({
  selector: 'ticket-form-templatez',
  imports: [FormInputBlackBox, DateBoxInput, FormField, TextBoxInput, DeviceFormTemplate, NumberBoxInput, NoteBoxInput, TicketDropBox, CustomerDropBox],
  templateUrl: './ticket.html',
  styleUrl: './ticket.scss',
})
export class TicketFormTemplate extends FormTemplateCommons<TicketTypeExt> {
  override fieldTree = computed(() => this.tree().ticket);
  customer?: any;

  constructor() {
    super();
    effect(() => this.setCustomerPK());
  }

  leftCustomer(customer: any) {
    if (customer && customer?.pk === this.customer?.pk)
      return;

    this.form.ticket.device().value.set(v7());
  }

  leftDevice(device: any) {
    this.customer = device?.customer;
  }

  private setCustomerPK() {
    const fresh = this.form.device.device.fresh().value();
    const customerPK = this.form.device.device.customer().value();

    if (!fresh) return;

    this.form.ticket.customer().value.set(customerPK);
  }
}