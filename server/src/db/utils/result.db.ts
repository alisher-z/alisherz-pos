import { QueryResult } from "pg";

export interface DBQueryError {
    message: string;
    code: string;
    detail: string;
    hint: string;
}

export class DBQueryResult {
    success: QueryResult<any> | null = null;
    error: DBQueryError | null = null;

    constructor(private result: Promise<QueryResult>) { }

    async attempt() {
        try {
            this.success = await this.result;
        } catch (e) {
            console.log(e);
            this.error = e as DBQueryError;
        }

        return this;
    }
}

export class DBResult<T> {
    status: number = 200;
    success: T | T[] | null = null;
    error: string[] | null = null;

    constructor(private qryRes: DBQueryResult, private options?: { single?: boolean }) {
        this.init();
    }

    private init() {
        const { error, success } = this.qryRes;
        const single = this.options?.single;

        if (success)
            this.success = single ? success.rows[0] : success.rows;

        if (success) {
            const result = success.rows;

            if (single)
                this.success = result[0][Object.keys(result[0])[0]];

            else
                this.success = result;
        }

        else {
            this.error = [error!.message];

            switch (error!.code) {
                case '22001': this.status = 400; break;
                case '23502': this.status = 400; break;
                case 'PX400': this.status = 400; break;
                case 'P0002': this.status = 404; break;
                case 'PX404': this.status = 404; break;
                case '23505': this.status = 409; break;
                case '23503': this.status = 422; break;
                case 'PX422': this.status = 422; break;
                default: this.status = 500; break;
            }
        }
    }
}