import { Router } from "express";
import Joi from "joi";
import { validate } from "../middleware/validation.mid";

function isParam(param: string) {
    const { error } = Joi.string().uuid({ version: 'uuidv7' }).validate(param);

    return error ? false : true;
}

export const router = Router()

    .post('/', validate, (req, res, next) => {
        req.dbResult = req.dbModel.save(req.body);
        next();
    })

    .get('/', (req, res, next) => {
        req.dbResult = req.dbModel.list(req.query);
        next();
    })

    .get('/:pk', (req, res, next) => {
        if (!isParam(req.params.pk))
            return next();

        req.dbResult = req.dbModel.byPK(req.params.pk);
        next();
    })

    .get('/count', (req, res, next) => {
        req.dbResult = req.dbModel.count();
        next();
    })

    .use(async (req, res) => {
        try {
            const { status, success, error } = await req.dbResult;
            res.status(status).send({ success, error });
        }

        catch (error) {
            console.log(error);
            res.status(404).send({
                error: 'the path you are trying to access does not exist!'
            })
        }

        finally {
            const role = req.posRole.role;
            if (!role) return;

            await req.posRole.role.end();
        }
    });