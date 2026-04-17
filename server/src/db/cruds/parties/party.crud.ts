import { iParty } from "../../../types/types";
import { CRUD } from "../crud.db";

export abstract class PartyCRUD<T> extends CRUD<iParty> {
    namespace = 'party';
}