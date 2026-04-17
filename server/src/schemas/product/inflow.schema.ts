import Joi from "joi";
import { sInflow, sInflowDetail } from "../inflow.schema";
import { sCustomer } from "../parties/customer.schema";
import { sProductOutflow } from "./outflow.schem";

export const sProductInflowDetail = Joi.object({
    detail: sInflowDetail.required(),
    outflow: sProductOutflow.optional()
}).required();

export const sProductInflow = Joi.object({
    customer: sCustomer.optional(),
    inflow: sInflow.append({
        detail: Joi.object({
            saves: Joi
                .array()
                .items(sProductInflowDetail)
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
    }).required()
}).required();

const a = {
    "inflow": {
        "pk": "019be239-8842-7107-8904-f55dd46329a7",
        "id": "testing id 1",
        "date": "2026-01-21T20:22:59.906Z",
        "customer": "019aff9f-13ae-7053-a91c-25ca31127ea2",
        "notes": "testing notes 1",
        "detail": {
            "saves": [
                {
                    "outflow": {
                        "pk": "019be239-8846-7733-b907-f4c91de36b50",
                        "id": null,
                        "date": "2026-01-21T20:22:59.910Z",
                        "customer": "019aff9f-13ae-7053-a91c-25ca31127ea2",
                        "notes": null,
                        "item": {
                            "saves": [
                                {
                                    "pk": "019be239-efaa-779c-9763-05330d28cdc0",
                                    "outflow": "019be239-8846-7733-b907-f4c91de36b50",
                                    "product": "019afe88-3ddc-74a5-a4c0-3ee30d8da684",
                                    "price": "019afe88-3ddb-7d4a-8711-a338cb6f1321",
                                    "quantity": 1,
                                    "notes": null
                                },
                                {
                                    "pk": "019be239-fdfb-7494-bed5-170f9607e98f",
                                    "outflow": "019be239-8846-7733-b907-f4c91de36b50",
                                    "product": "019b078e-0560-769a-abdd-593e45b06edf",
                                    "price": "019b078e-0560-7304-a038-faebab99cdf0",
                                    "quantity": 3,
                                    "notes": ""
                                }
                            ],
                            "deletes": []
                        }
                    },
                    "detail": {
                        "pk": "019be239-8846-7733-b907-f8447e04a311",
                        "amount": 1600,
                        "discount": 0,
                        "inflow": "019be239-8842-7107-8904-f55dd46329a7",
                        "outflow": "019be239-8846-7733-b907-f4c91de36b50",
                        "notes": null
                    }
                }
            ]
        }
    }
}

const b = [
    "inflow.detail.saves[0].pk is required",
    "inflow.detail.saves[0].amount is required",
    "inflow.detail.saves[0].discount is required",
    "inflow.detail.saves[0].inflow is required",
    "inflow.detail.saves[0].outflow must be a string",
    "inflow.detail.saves[0].detail is not allowed",
    "inflow.detail.saves does not contain 1 required value(s)"
]