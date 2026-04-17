import { Router } from "express";
import { BrandCRUD } from "../../db/cruds/public/brand.crud";
import { sBrand } from "../../schemas/public/brand.schema";
import { router } from "../route";

export const rBrand = Router()
    .use((req, res, next) => {
        req.dbModel = new BrandCRUD(req.posRole);
        req.joiSchema = sBrand;
        next();
    }).use(router);