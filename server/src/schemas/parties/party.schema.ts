import Joi from 'joi';

export const sParty = Joi.object({
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

    name: Joi
        .string()
        .max(255)
        .required(),

    phone: Joi
        .string()
        .max(50)
        .allow('', null)
        .optional()
        .default(null),

    email: Joi
        .string()
        .email()
        .max(255)
        .allow('', null)
        .optional()
        .default(null),

    address: Joi
        .string()
        .max(1000)
        .allow('', null)
        .optional()
        .default(null),

    notes: Joi
        .string()
        .max(1000)
        .allow('', null)
        .optional()
        .default(null),

    active: Joi.boolean().required()
}).required();
