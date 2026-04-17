import { Router } from "express";
import { rDevice } from "./device.route";
import { rRepairInflow } from "./inflow.route";
import { rServiceOutflow } from "./outflow.route";
import { rTicket } from "./ticket.route";

export const rRepair = Router()
    .use('/device', rDevice)
    .use('/ticket', rTicket)
    .use('/outflow', rServiceOutflow)
    .use('/inflow', rRepairInflow);