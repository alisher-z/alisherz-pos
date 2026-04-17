import { ObjectSchema } from "joi";
import { CRUD } from "../../db/cruds/crud.db";
import { DBResult, Role } from "../types";

declare module 'express-serve-static-core' {
    interface Request {
        posRole: Role;
        dbModel: CRUD<any>;
        joiSchema: ObjectSchema;
        dbResult: Promise<DBResult<any>>;
    }
}