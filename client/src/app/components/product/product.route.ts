import { Routes } from "@angular/router";
import { ProductInventoryItemFormInput } from "../../templates/forms/product/inventory/items/form/form";
import { ProductOutflowItemFormInput } from "../../templates/forms/product/outflow/items/form/form";
import { ProductInflowFormZ } from "./inflow/form/form";
import { ProductInflowZ } from "./inflow/inflow";
import { ProductInventoryFormZ } from "./inventory/form/form";
import { ProductInventoryZ } from "./inventory/inventory";
import { ProductOutflowFormZ } from "./outflow/form/form";
import { ProductOutflowZ } from "./outflow/outflow";
import { ProductPriceHistoryFormZ } from "./pric-history/form/form";
import { ProductPriceHistoryZ } from "./pric-history/price-history";
import { ProductTypeFormZ } from "./product-type/form/form";
import { ProductTypez } from "./product-type/product-type";
import { ProductSelfFormZ } from "./self/form/form";
import { ProductSelfZ } from "./self/self";

export const productRoutes: Routes = [
    {
        path: 'type', component: ProductTypez,
        children: [
            { path: 'form', component: ProductTypeFormZ },
            { path: 'form/:pk', component: ProductTypeFormZ },
        ]
    },



    {
        path: 'self', component: ProductSelfZ,
        children: [
            { path: 'form', component: ProductSelfFormZ },
            { path: 'form/:pk', component: ProductSelfFormZ }
        ]
    },



    {
        path: 'price-history', component: ProductPriceHistoryZ,
        children: [
            { path: 'form', component: ProductPriceHistoryFormZ },
            { path: 'form/:pk', component: ProductPriceHistoryFormZ }
        ]
    },


    {
        path: 'outflow', component: ProductOutflowZ,
        children: [
            {
                path: 'form', component: ProductOutflowFormZ,
                children: [
                    { path: 'item', component: ProductOutflowItemFormInput }
                ]
            },
            {
                path: 'form/:pk', component: ProductOutflowFormZ,
                children: [
                    { path: 'item', component: ProductOutflowItemFormInput }
                ]
            }
        ]
    },

    {
        path: 'inflow', component: ProductInflowZ,
        children: [
            {
                path: 'form', component: ProductInflowFormZ, children: [
                    { path: 'item', component: ProductOutflowItemFormInput }
                ]
            },
            {
                path: 'form/:pk', component: ProductInflowFormZ
            }
        ]
    },

    {
        path: 'inventory', component: ProductInventoryZ, children: [
            {
                path: 'form', component: ProductInventoryFormZ, children: [
                    { path: 'item', component: ProductInventoryItemFormInput }
                ]
            },
            {
                path: 'form/:pk', component: ProductInventoryFormZ, children: [
                    { path: 'item', component: ProductInventoryItemFormInput }
                ]
            }
        ]
    }
]