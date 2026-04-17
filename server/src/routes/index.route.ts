import { Router } from "express";
import { rParty } from "./parties/party.route";
import { rProduct } from "./product/product.route";
import { rPublic } from "./public/public.route";
import { rRepair } from "./repair/repair.route";
import { rService } from "./service/service.route";

export const routers = Router()
    .use('/party', rParty)
    .use('/public', rPublic)
    .use('/product', rProduct)
    .use('/repair', rRepair)
    .use('/service', rService);