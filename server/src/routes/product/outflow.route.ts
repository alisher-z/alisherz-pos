import { Router } from "express";
import { ProdudctOutflowCRUD } from "../../db/cruds/product/outflow.crud";
import { sProductOutflow } from "../../schemas/product/outflow.schem";
import { router } from "../route";

export const rProductOutflow = Router()
    .use((req, res, next) => {
        req.dbModel = new ProdudctOutflowCRUD(req.posRole);
        req.joiSchema = sProductOutflow;
        next();
    }).use(router);