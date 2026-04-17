import Joi from "joi";

export function getServiceSelfSchema() {
   return Joi.object({
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

      notes: Joi
         .string()
         .max(1000)
         .allow('', null)
         .optional()
         .default(null),
   });
}

export function getServicePriceHistorySchema() {
   return Joi.object({
      pk: Joi
         .string()
         .uuid({ version: 'uuidv7' })
         .required(),

      amount: Joi
         .number()
         .required(),

      service: Joi
         .string()
         .uuid({ version: 'uuidv7' })
         .required()
   });
}