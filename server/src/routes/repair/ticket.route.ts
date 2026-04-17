import { Router } from "express";
import { TicketCRUD } from "../../db/cruds/repair/ticket.crud";
import { sTicket } from "../../schemas/repair/ticket.schema";
import { router } from "../route";

export const rTicket = Router()
    .use((req, res, next) => {
        req.dbModel = new TicketCRUD(req.posRole);
        req.joiSchema = sTicket;
        next();
    }).use(router);