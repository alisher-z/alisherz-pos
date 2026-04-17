import Joi from "joi";
import { sOutflow, sOutflowItem } from "../outflow.schem";

const repairServiceSchema = Joi.object({
    pk: Joi
        .string()
        .uuid({ version: 'uuidv7' })
        .required(),

    notes: Joi
        .string()
        .max(1000)
        .allow('', null)
        .optional()
        .default(null),

    price: Joi
        .string()
        .uuid({ version: 'uuidv7' })
        .required(),

    outflow: Joi
        .string()
        .uuid({ version: 'uuidv7' })
        .required(),

    service: Joi
        .string()
        .uuid({ version: 'uuidv7' })
        .required(),

    duration: Joi
        .string()
        .required()
}).required();

export const sRepairOutflow = sOutflow.append({
    ticket: Joi.string().uuid({ version: 'uuidv7' }).required(),
    item: Joi.object({
        saves: Joi
            .array()
            .items(sOutflowItem.optional())
            .required(),

        deletes: Joi
            .array()
            .items(Joi
                .string()
                .uuid({ version: 'uuidv7' })
                .required()
            ).optional()
    }).required(),

    service: Joi.object({
        saves: Joi
            .array()
            .items(repairServiceSchema.optional())
            .required(),

        deletes: Joi
            .array()
            .items(Joi
                .string()
                .uuid({ version: 'uuidv7' })
                .required()
            ).optional()
    }).required()
}).custom((v, h) => {
    const has1 = (<any[]>v.item.saves).length > 0;
    const has2 = (<any[]>v.service.saves).length > 0;

    return !has1 && !has2 ? h.error('any.has-one') : v
}, 'one array non-empty validation'
).messages({
    'any.has-one': 'at least one of items or services must contain an element!'
}).required();