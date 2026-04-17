import Joi from "joi";

export const sInflowDetail = Joi.object({
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

    amount: Joi
        .number()
        .required(),

    discount: Joi
        .number()
        .required(),

    inflow: Joi
        .string()
        .uuid({ version: 'uuidv7' })
        .required(),

    outflow: Joi
        .string()
        .uuid({ version: 'uuidv7' })
        .required(),
}).required();

export const sInflow = Joi.object({
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

    date: Joi
        .string()
        .isoDate()
        .required(),

    notes: Joi
        .string()
        .max(1000)
        .allow('', null)
        .optional()
        .default(null),

    customer: Joi
        .string()
        .uuid({ version: 'uuidv7' })
        .required()
}).required();