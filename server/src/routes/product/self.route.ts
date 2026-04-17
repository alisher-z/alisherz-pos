import { Router } from "express";
import { SelfCRUD } from "../../db/cruds/product/selft.crud";
import { sSelf } from "../../schemas/product/self.schema";
import { router } from "../route";

export const rSelf = Router()
    .use((req, res, next) => {
        req.dbModel = new SelfCRUD(req.posRole);
        req.joiSchema = sSelf;
        next();
    }).use(router);