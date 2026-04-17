import { Router } from "express";
import { PriceHistoryCRUD } from "../../db/cruds/product/price-history.crud";
import { sPriceHistory } from "../../schemas/product/price-history.schema";
import { router } from "../route";

export const rPriceHistory = Router()
    .use((req, res, next) => {
        req.dbModel = new PriceHistoryCRUD(req.posRole);
        req.joiSchema = sPriceHistory;
        next();
    }).use(router);