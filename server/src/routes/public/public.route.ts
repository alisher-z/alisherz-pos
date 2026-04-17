import { Router } from "express";
import { rBrand } from "./brand.route";

export const rPublic = Router()
    .use('/brand', rBrand);