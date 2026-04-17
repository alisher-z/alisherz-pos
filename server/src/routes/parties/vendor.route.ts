import { Router } from "express";
import { VendorCRUD } from "../../db/cruds/parties/vendor.crud";
import { sVendor } from "../../schemas/parties/vendor.schema";
import { router } from "../route";

export const rVendor = Router()
    .use((req, res, next) => {
        req.dbModel = new VendorCRUD(req.posRole);
        req.joiSchema = sVendor;
        next();
    }).use(router);