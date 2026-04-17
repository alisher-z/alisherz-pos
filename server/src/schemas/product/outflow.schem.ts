import Joi from "joi";
import { sOutflow, sOutflowItem } from "../outflow.schem";
import { sCustomer } from "../parties/customer.schema";

export const sProductOutflowItem = sOutflowItem;

export const sProductOutflow = Joi.object({
    customer: sCustomer.optional(),
    outflow: sOutflow.append({
        item: Joi.object({
            saves: Joi
                .array()
                .items(sOutflowItem)
                .min(1)
                .required(),

            deletes: Joi
                .array()
                .items(
                    Joi
                        .string()
                        .uuid({ version: 'uuidv7' })
                        .required()
                ).optional()
        }).required()
    }).required()
}).required();