import { Router } from "express";
import { getDuration, getDurations } from "./duration.route";
import { rServicePriceHistory } from "./price.route";
import { rServiceSelf } from "./self.route";

export const rService = Router()
    .post('/get-duration', getDuration)
    .post('/get-durations', getDurations)
    .use('/self', rServiceSelf)
    .use('/price-history', rServicePriceHistory);