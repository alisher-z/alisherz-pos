import Joi from "joi";
import { getPriceHistorySchema, getSelfSchema } from "./all";


export const sPriceHistory = Joi.object({
    product: getSelfSchema().optional(),
    history: getPriceHistorySchema().required()
}).required().label('Price History');