import { Router } from "express";
import { ProductInventoryCRUD } from "../../db/cruds/product/inventory.crud";
import { sProductInventory } from "../../schemas/product/inventory.schema";
import { router } from "../route";

export const rProductInventory = Router()
    .use((req, res, next) => {
        req.dbModel = new ProductInventoryCRUD(req.posRole);
        req.joiSchema = sProductInventory;
        next();
    }).use(router);