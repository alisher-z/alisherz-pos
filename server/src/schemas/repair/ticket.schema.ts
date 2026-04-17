import Joi from "joi";
import { sDevice } from "./device.schema";

const schema = Joi.object({
    pk: Joi
        .string()
        .uuid({ version: 'uuidv7' })
        .required(),

    id: Joi
        .string()
        .max(100)
        .allow('', null)
        .optional()
        .default(null),

    customer: Joi
        .string()
        .uuid({ version: 'uuidv7' })
        .required(),

    date: Joi
        .string()
        .isoDate()
        .required(),

    device: Joi
        .string()
        .uuid({ version: 'uuidv7' })
        .required(),

    problem: Joi
        .string()
        .max(1000)
        .allow('', null)
        .optional()
        .default(null),

    estimated: Joi
        .number()
        .required()
}).required();

export const sTicket = Joi.object({
    device: sDevice.optional(),
    ticket: schema
}).required();