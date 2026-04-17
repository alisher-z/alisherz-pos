import { FieldContext, LogicFn, OneOrMany, PathKind, ValidationError } from "@angular/forms/signals";

export type BaseValidatorConfig<TValue, TPathKind extends PathKind = PathKind.Root> =
    | {
        message?: string | LogicFn<TValue, string, TPathKind>;
        error?: never;
    }
    | {
        error?: OneOrMany<ValidationError> | LogicFn<TValue, OneOrMany<ValidationError>, TPathKind>;
        message?: never;
    };

export type ValueWithLengthOrSize = { length: number } | { size: number };

export function isEmpty(value: unknown) {
    if (typeof value === 'number') {
        return isNaN(value);
    }
    return value === '' || value === false || value == null;
}

export function getOption<TOption, TValue, TPathKind extends PathKind = PathKind.Root>(
    opt: Exclude<TOption, Function> | LogicFn<TValue, TOption, TPathKind> | undefined,
    ctx: FieldContext<TValue, TPathKind>,
): TOption | undefined {
    return opt instanceof Function ? opt(ctx) : opt;
}

export function getLengthOrSize(value: ValueWithLengthOrSize) {
    const v = value as { length: number; size: number };
    return typeof v.length === 'number' ? v.length : v.size;
}

export function debouncez(func: any, delay = 300) {
    let timeout: number | undefined;

    return (...args: any) => {
        clearTimeout(timeout);

        timeout = setTimeout(() => {
            func(...args);
        }, delay);
    }
}