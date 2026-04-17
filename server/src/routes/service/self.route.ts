import { Router } from "express";
import { ServiceSelfCRUD } from "../../db/cruds/service/selft.crud";
import { sServiceSelf } from "../../schemas/service/self.schema";
import { router } from "../route";

export const rServiceSelf = Router()
    .use((req, res, next) => {
        req.dbModel = new ServiceSelfCRUD(req.posRole);
        req.joiSchema = sServiceSelf;
        next();
    }).use(router);