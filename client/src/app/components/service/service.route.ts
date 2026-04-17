import { Routes } from "@angular/router";
import { ServicePriceHistoryFormZ } from "./price-history/form/form";
import { ServicePriceHistoryZ } from "./price-history/price-history";
import { ServiceSelfFormZ } from "./self/form/form";
import { ServiceSelfZ } from "./self/self";

export const serviceRoutes: Routes = [
   {
      path: 'self', component: ServiceSelfZ, children: [
         { path: 'form', component: ServiceSelfFormZ },
         { path: 'form/:pk', component: ServiceSelfFormZ }
      ]
   },
   {
      path: 'price-history', component: ServicePriceHistoryZ, children: [
         { path: 'form', component: ServicePriceHistoryFormZ },
         { path: 'form/:pk', component: ServicePriceHistoryFormZ }
      ]
   }
]