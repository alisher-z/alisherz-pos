import { Routes } from "@angular/router";
import { BrandZ } from "./brand/brand";
import { BrandFormZ } from "./brand/form/form";

export const publicRoutes: Routes = [
    {
        path: 'brand', component: BrandZ, children: [
            { path: 'form', component: BrandFormZ },
            { path: 'form/:pk', component: BrandFormZ }
        ]
    }
]