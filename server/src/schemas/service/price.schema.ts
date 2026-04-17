import Joi from "joi";
import { getServicePriceHistorySchema, getServiceSelfSchema } from "./all";

export const sServicePriceHistory = Joi.object({
    service: getServiceSelfSchema().optional(),
    history: getServicePriceHistorySchema().required()
});