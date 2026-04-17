import { CRUD } from "../crud.db";

export abstract class ProductCRUD<T> extends CRUD<T> {
    namespace = 'product';
}