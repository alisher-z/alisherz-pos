import { Routes } from "@angular/router";
import { RepairOutflowFormInput } from "../../templates/forms/repair/outflow/children/form/form";
import { DeviceZ } from "./device/device";
import { DeviceFormZ } from "./device/form/form";
import { RepairOutflowFormZ } from "./outflow/form/form";
import { RepairOutflowZ } from "./outflow/outflow";
import { TicketFormZ } from "./ticket/form/form";
import { TicketZ } from "./ticket/ticket";

export const repairRoutes: Routes = [
   {
      path: 'device', component: DeviceZ, children: [
         { path: 'form', component: DeviceFormZ },
         { path: 'form/:pk', component: DeviceFormZ }
      ]
   },
   {
      path: 'ticket', component: TicketZ, children: [
         { path: 'form', component: TicketFormZ },
         { path: 'form/:pk', component: TicketFormZ }
      ]
   },
   {
      path: 'outflow', component: RepairOutflowZ, children: [
         {
            path: 'form', component: RepairOutflowFormZ, children: [{
               path: 'item', component: RepairOutflowFormInput
            }]
         },
         {
            path: 'form/:pk', component: RepairOutflowFormZ, children: [{
               path: 'item', component: RepairOutflowFormInput
            }]
         }
      ]
   }
]