import Joi from "joi";

/*
export const sOutflowItem = Joi.object({
    product: sSelf.optional(),
    history: sPriceHistory.optional(),
    item: Joi.object({
        pk: Joi
            .string()
            .uuid({ version: 'uuidv7' })
            .required(),

        outflow: Joi
            .string()
            .uuid({ version: 'uuidv7' })
            .required(),

        product: Joi
            .string()
            .uuid({ version: 'uuidv7' })
            .required(),

        price: Joi
            .string()
            .uuid({ version: 'uuidv7' })
            .required(),

        quantity: Joi
            .number()
            .integer()
            .required(),

        notes: Joi
            .string()
            .max(1000)
            .allow('', null)
            .optional()
            .default(null),

    }).required()
}).required();
*/

export const sOutflowItem = Joi.object({
    pk: Joi
        .string()
        .uuid({ version: 'uuidv7' })
        .required(),

    outflow: Joi
        .string()
        .uuid({ version: 'uuidv7' })
        .required(),

    product: Joi
        .string()
        .uuid({ version: 'uuidv7' })
        .required(),

    price: Joi
        .string()
        .uuid({ version: 'uuidv7' })
        .required(),

    quantity: Joi
        .number()
        .integer()
        .required(),

    notes: Joi
        .string()
        .max(1000)
        .allow('', null)
        .optional()
        .default(null)
}).required();

export const sOutflow = Joi.object({
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