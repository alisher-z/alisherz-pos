import { required, schema } from "@angular/forms/signals";
import { RepairOutflowServiceType } from "../types/form/repair-outflow-service";
import { maxLength } from "../utils/custome-validations/max.length";

export const REPAIR_OUTFLOW_SERVICE_SCHEMA = schema<RepairOutflowServiceType>(p => {
   required(p.pk, { message: 'outflow service primary key' });
   required(p.service, { message: 'outflow service service primary key' });
   required(p.outflow, { message: 'outflow service outflow primary key' });
   required(p.price, { message: 'outflow service price history primary key' });
   required(p.duration, { message: 'outflow service duration' });

   maxLength(p.notes, 1000, { message: 'outflow service notes' });
})