import { Router } from "express";
import { ServiceOutflowCRUD } from "../../db/cruds/repair/outflow.crud";
import { sRepairOutflow } from "../../schemas/repair/outflow.schema";
import { router } from "../route";

export const rServiceOutflow = Router()
    .use((req, res, next) => {
        req.dbModel = new ServiceOutflowCRUD(req.posRole);
        req.joiSchema = sRepairOutflow;
        next();
    }).use(router);