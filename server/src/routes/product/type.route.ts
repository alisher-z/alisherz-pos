import { Router } from "express";
import { TypeCRUD } from "../../db/cruds/product/type.crud";
import { sType } from "../../schemas/product/type.schema";
import { router } from "../route";

export const rType = Router()
    .use((req, res, next) => {
        req.dbModel = new TypeCRUD(req.posRole);
        req.joiSchema = sType;
        next();
    }).use(router);