import { Pool } from "pg";
import { DBQueryResult, DBResult, Role } from "../../types/types";

export abstract class CRUD<T> {
    protected abstract namespace: string;
    protected abstract model: string;
    protected user: string;
    protected role: Pool;

    constructor({ user, role }: Role) {
        this.user = user;
        this.role = role;
    }

    save(data: T) {
        return this.run(this.saveQry, data);
    }

    list(qry: T) {
        return this.query(this.listQry, qry, false);
    }

    byPK(pk: string) {
        return this.query(this.pkQry, pk, true);
    }

    count() {
        return this.query(this.countQry, null, true);
    }

    protected async run(qry: string, data: any) {
        const raw = this.role.query(qry, [this.user, JSON.stringify(data)]);
        const qryRes = await new DBQueryResult(raw).attempt();
        const result = new DBResult(qryRes, { single: true });

        return result;
    }

    protected async query(qry: string, data: any, single: boolean) {
        const raw = this.role.query(
            qry,
            data ? [single ? data : JSON.stringify(data)] : undefined
        );
        const qryRes = await new DBQueryResult(raw).attempt();
        const result = new DBResult(qryRes, { single });

        return result;
    }

    private get saveQry() {
        return `select ${this.namespace}.save_${this.model}($1::uuid, $2::jsonb)`;
    }

    private get listQry() {
        return `select * from ${this.namespace}.${this.model}_list($1::jsonb)`;
    }

    private get pkQry() {
        return `select * from ${this.namespace}.${this.model}_by_pk($1::uuid)`;
    }

    private get countQry() {
        return `select * from ${this.namespace}.count_${this.model}()`;
    }
}