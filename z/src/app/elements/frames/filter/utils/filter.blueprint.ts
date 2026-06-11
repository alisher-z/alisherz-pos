import { Injectable } from "@angular/core";
import { FieldTree } from "@angular/forms/signals";
import { isArray, isEmpty, isPlainObject } from "lodash";
import { SearchFields } from "../../../../http/types";

@Injectable()
export abstract class FilterBluePrint<T> {
    abstract readonly fields: SearchFields[];
    abstract readonly form: FieldTree<T, string | number>;
    abstract getInitData(): T;


    getData(form: T): Partial<T> | undefined {
        const values: T = structuredClone(form);

        this.createData(values);

        return Object.keys(values as any).length > 0 ? values : undefined;
    }

    private createData(data: any) {
        for (const key in data) {
            const value = data[key];

            if (isPlainObject(value) && !this.createData(value))
                delete (data[key]);

            else if (isArray(value) && isEmpty(value))
                delete (data[key]);
        }

        return !isEmpty(data);
    }
}