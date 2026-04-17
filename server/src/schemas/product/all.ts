import Joi from "joi";

export { sBrand } from "../public/brand.schema";
export { sType } from "./type.schema";

export function getSelfSchema() {
   return Joi.object({
      pk: Joi
         .string()
         .uuid({ version: 'uuidv7' })
         .required(),

      barcode: Joi
         .string()
         .max(100)
         .allow('', null)
         .optional()
         .default(null),

      name: Joi
         .string()
         .max(255)
         .required(),

      type: Joi
         .string()
         .uuid({ version: 'uuidv7' })
         .required(),

      brand: Joi
         .string()
         .uuid({ version: 'uuidv7' })
         .required(),

      serial: Joi
         .string()
         .max(100)
         .allow('', null)
         .optional()
         .default(null),

      model: Joi
         .string()
         .max(100)
         .allow('', null)
         .optional()
         .default(null),

      notes: Joi
         .string()
         .max(1000)
         .allow('', null)
         .optional()
         .default(null),
   })
}

export function getPriceHistorySchema() {
   return Joi.object({
      pk: Joi
         .string()
         .uuid({ version: 'uuidv7' })
         .required(),

      product: Joi
         .string()
         .uuid({ version: 'uuidv7' })
         .required(),

      amount: Joi
         .number()
         .required(),

      notes: Joi
         .string()
         .max(1000)
         .allow('', null)
         .optional()
         .default(null),
   });
}