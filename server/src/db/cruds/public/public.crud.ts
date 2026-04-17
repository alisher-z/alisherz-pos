import { CRUD } from "../crud.db";

export abstract class PublicCRUD<T> extends CRUD<T> {
    namespace = 'public';
}