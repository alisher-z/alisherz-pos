import Joi from "joi";

export const sBrand = Joi.object({
    pk: Joi
        .string()
        .uuid({ version: 'uuidv7' })
        .required(),

    name: Joi
        .string()
        .max(255)
        .required(),

    notes: Joi
        .string()
        .max(1000)
        .allow('', null)
        .optional()
        .default(null),

    active: Joi.boolean().required()
}).required().label('Brand');