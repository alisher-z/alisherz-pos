import { Router } from "express";
import { RepairInflowCRUD } from "../../db/cruds/repair/inflow.crud";
import { sRepairInflow } from "../../schemas/repair/inflow.schema";
import { router } from "../route";

export const rRepairInflow = Router()
    .use((req, res, next) => {
        req.dbModel = new RepairInflowCRUD(req.posRole);
        req.joiSchema = sRepairInflow;
        next();
    }).use(router);