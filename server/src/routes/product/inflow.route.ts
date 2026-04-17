import { Router } from "express";
import { ProductInflowCRUD } from "../../db/cruds/product/inflow.crud";
import { sProductInflow } from "../../schemas/product/inflow.schema";
import { router } from "../route";

export const rProductInflow = Router()
    .use((req, res, next) => {
        req.dbModel = new ProductInflowCRUD(req.posRole);
        req.joiSchema = sProductInflow;
        next();
    }).use(router);