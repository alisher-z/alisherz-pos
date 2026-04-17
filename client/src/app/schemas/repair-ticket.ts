import { apply, disabled, hidden, required, schema } from "@angular/forms/signals";
import { TicketType, TicketTypeExt } from "../types/form/repair-ticket";
import { maxLength } from "../utils/custome-validations/max.length";
import { DEVICE_SCHEMA_EXT } from "./repair-device";

export const TICKET_SCHEMA = schema<TicketType>(p => {
   required(p.pk, { message: 'ticket primary key' });
   required(p.date, { message: 'ticket date' });
   required(p.customer, { message: 'ticket customer primary key' });
   required(p.device, { message: 'ticket device primary key' });
   required(p.estimated, { message: 'ticket estimated' });
   maxLength(p.id, 100, { message: 'ticket id' });
   maxLength(p.problem, 1000, { message: 'ticket problem' });
});

export const TICKET_SCHEMA_EXT = schema<TicketTypeExt>(p => {
   apply(p.device, DEVICE_SCHEMA_EXT);
   apply(p.ticket, TICKET_SCHEMA);

   disabled(p.ticket.device, c => c.valueOf(p.ticket.customer) ? false : true);
   hidden(p.device, c => !c.valueOf(p.device.device.fresh));
});