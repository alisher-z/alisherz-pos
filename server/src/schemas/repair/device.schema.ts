import Joi from "joi";
import { sCustomer } from "../parties/customer.schema";
import { sBrand } from "../public/brand.schema";

const schema = Joi.object({
    pk: Joi
        .string()
        .uuid({ version: 'uuidv7' })
        .required(),

    model: Joi
        .string()
        .max(255)
        .allow('', null)
        .optional()
        .default(null),

    serial: Joi
        .string()
        .max(255)
        .allow('', null)
        .optional()
        .default(null),

    notes: Joi
        .string()
        .max(1000)
        .allow('', null)
        .optional()
        .default(null),

    brand: Joi
        .string()
        .uuid({ version: 'uuidv7' })
        .required(),

    customer: Joi
        .string()
        .uuid({ version: 'uuidv7' })
        .required()
}).required();

export const sDevice = Joi.object({
    brand: sBrand.optional(),
    customer: sCustomer.optional(),
    device: schema.required()
});