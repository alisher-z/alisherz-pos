import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";

export function getResult(schema: ObjectSchema, data: any) {
    const { error } = schema.validate(data, { abortEarly: false });

    if (!error)
        return null;

    const messages: string[] = [];
    for (const d of error.details)
        messages.push(d.message);

    return messages;
}

export function validate({ joiSchema, body }: Request, res: Response, next: NextFunction) {
    const error = getResult(joiSchema, body);

    if (!error)
        return next();

    res.status(400).send({ error });
}