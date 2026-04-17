import Joi from "joi";
import { sInflow, sInflowDetail } from "../inflow.schema";
import { sCustomer } from "../parties/customer.schema";
import { sRepairOutflow } from "./outflow.schema";

export const sRepairInflowDetail = Joi.object({
    outflow: sRepairOutflow.optional(),
    detail: sInflowDetail
});

export const sRepairInflow = Joi.object({
    customer: sCustomer.optional(),
    inflow: sInflow.append({
        details: Joi
            .array()
            .items(sRepairInflowDetail)
            .min(1)
            .required()
    }).required()
}).required();