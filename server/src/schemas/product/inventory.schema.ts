import Joi from "joi";
import { sVendor } from "../parties/vendor.schema";
import { sSelf } from "./self.schema";

const item = Joi.object({
    pk: Joi
        .string()
        .uuid({ version: 'uuidv7' })
        .required(),

    cost: Joi
        .number()
        .required(),

    notes: Joi
        .string()
        .max(1000)
        .allow('', null)
        .optional()
        .default(null),

    product: Joi
        .string()
        .uuid({ version: 'uuidv7' })
        .required(),

    quantity: Joi
        .number()
        .integer()
        .required(),

    inventory: Joi
        .string()
        .uuid({ version: 'uuidv7' })
        .required()
}).required();

const inventory = Joi.object({
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

    vendor: Joi
        .string()
        .uuid({ version: 'uuidv7' })
        .required()

}).required();


export const sProductInventory = Joi.object({
    vendor: sVendor.optional(),
    inventory: inventory.append({
        item: Joi.object({
            saves: Joi
                .array()
                .items(Joi.object({
                    product: sSelf.optional(),
                    item: item
                }))
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
    })
}).required()