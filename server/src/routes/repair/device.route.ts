import { Router } from "express";
import { DeviceCRUD } from "../../db/cruds/repair/device.crud";
import { sDevice } from "../../schemas/repair/device.schema";
import { router } from "../route";

export const rDevice = Router()
    .use((req, res, next) => {
        req.dbModel = new DeviceCRUD(req.posRole);
        req.joiSchema = sDevice;
        next();
    }).use(router);