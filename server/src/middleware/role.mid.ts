import { NextFunction, Request, Response } from "express";
import { getRole } from "../db/role.db";

export function setRole(req: Request, res: Response, next: NextFunction) {
    const role = getRole('admin', '66408');

    if (!role)
        return res.status(500).send({ error: ['Database is down please try again later or contact your database adminstrator!'] });

    req.posRole = {
        role,
        user: '019af066-9554-7daf-887b-c242d13d552f'
    }

    next();
}