import { Routes } from "@angular/router";
import { Customerz } from "./customer/customer";
import { CustomerFormz } from "./customer/form/form";
import { VendorFormZ } from "./vendor/form/form";
import { VendorZ } from "./vendor/vendor";

export const partyRoutes: Routes = [
    {
        path: 'customer', component: Customerz, children: [
            { path: 'form', component: CustomerFormz },
            { path: 'form/:pk', component: CustomerFormz }
        ]
    },
    {
        path: 'vendor', component: VendorZ, children: [
            { path: 'form', component: VendorFormZ },
            { path: 'form/:pk', component: VendorFormZ }
        ]
    }
]