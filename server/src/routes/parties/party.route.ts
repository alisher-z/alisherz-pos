import { Router } from "express";
import { rCustomer } from "./customer.route";
import { rVendor } from "./vendor.route";

export const rParty = Router()
    .use('/customer', rCustomer)
    .use('/vendor', rVendor);