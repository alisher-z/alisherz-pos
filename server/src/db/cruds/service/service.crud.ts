import { CRUD } from "../crud.db";

export abstract class ServiceCRUD<T> extends CRUD<T> {
    namespace = 'service';
}