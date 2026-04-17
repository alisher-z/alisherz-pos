import { CRUD } from "../crud.db";

export abstract class RepairCRUD<T> extends CRUD<T> {
    namespace = 'repair';
}