import Joi from "joi";
import { getPriceHistorySchema, getSelfSchema, sBrand, sType } from "./all";



export const sSelf = Joi.object({
    type: sType.optional(),
    brand: sBrand.optional(),
    history: getPriceHistorySchema().optional(),
    product: getSelfSchema().required().label('Product')
}).required().label('Product Set');