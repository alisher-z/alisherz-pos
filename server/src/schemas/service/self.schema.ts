import Joi from "joi";
import { getServicePriceHistorySchema, getServiceSelfSchema } from "./all";

export const sServiceSelf = Joi.object({
    history: getServicePriceHistorySchema().optional(),
    service: getServiceSelfSchema().required()
});