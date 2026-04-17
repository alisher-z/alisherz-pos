import { Router } from "express";
import { ServicePriceHistory } from "../../db/cruds/service/price.crud";
import { sServicePriceHistory } from "../../schemas/service/price.schema";
import { router } from "../route";

export const rServicePriceHistory = Router()
    .use((req, res, next) => {
        req.dbModel = new ServicePriceHistory(req.posRole);
        req.joiSchema = sServicePriceHistory;
        next();
    }).use(router);