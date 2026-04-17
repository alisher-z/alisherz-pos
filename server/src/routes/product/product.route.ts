import { Router } from "express";
import { rProductInflow } from "./inflow.route";
import { rProductInventory } from "./inventory.route";
import { rProductOutflow } from "./outflow.route";
import { rPriceHistory } from "./price-history.route";
import { rSelf } from "./self.route";
import { rType } from "./type.route";

export const rProduct = Router()
    .use('/type', rType)
    .use('/self', rSelf)
    .use('/price-history', rPriceHistory)
    .use('/outflow', rProductOutflow)
    .use('/inflow', rProductInflow)
    .use('/inventory', rProductInventory);