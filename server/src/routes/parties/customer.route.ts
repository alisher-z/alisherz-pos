import { Router } from "express";
import { CustomerCRUD } from "../../db/cruds/parties/customer.crud";
import { sCustomer } from "../../schemas/parties/customer.schema";
import { router } from "../route";

export const rCustomer = Router()
    .use((req, res, next) => {
        req.dbModel = new CustomerCRUD(req.posRole);
        req.joiSchema = sCustomer;
        next();
    }).use(router);