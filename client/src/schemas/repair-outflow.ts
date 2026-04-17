import { required, schema, validate } from "@angular/forms/signals";
import { RepairOutflowType } from "../app/types/form/repair-outflow";
import { maxLength } from "../app/utils/custome-validations/max.length";

export const REPAIR_OUTFLOW_SCHEMA = schema<RepairOutflowType>(p => {
   required(p.pk, { message: 'repair outflow primary key' });
   required(p.date, { message: 'repair outflow date' });
   required(p.ticket, { message: 'repair outflow ticket primary key' });
   required(p.customer, { message: 'repair outflow customer primary key' });

   maxLength(p.id, 100, { message: 'repair outflow id' });
   maxLength(p.notes, 1000, { message: 'repair outflow notes' });

   validate(p, c => {
      const items = c.valueOf(p.item.saves);
      const services = c.valueOf(p.service.saves);

      if (items.length > 0 || services.length > 0)
         return undefined;

      return {
         kind: 'items|services',
         message: 'items or services must have at least one item!'
      }
   })
});

// export const REPAIR_OUTFLOW_SCHEMA_EXT = schema<RepairOutflowTypeExt>(p => {
//    apply(p.customer, CUSTOMER_SCHEMA);
//    apply(p.ticket, TICKET_SCHEMA_EXT);
//    apply(p.outflow, REPAIR_OUTFLOW_SCHEMA);

//    hidden(p.customer, c => !c.valueOf(p.customer.fresh));
//    hidden(p.ticket, c => !c.valueOf(p.ticket.ticket.fresh));
// });