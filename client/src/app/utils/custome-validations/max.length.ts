import { maxLengthError, PathKind, SchemaPath, SchemaPathRules, validate } from "@angular/forms/signals";
import { BaseValidatorConfig, getLengthOrSize, getOption, isEmpty } from "../util";

export function maxLength<TValue, TPathKind extends PathKind = PathKind.Root>(
    path: SchemaPath<TValue | null, SchemaPathRules.Supported, TPathKind>,
    maxLength: number,
    config?: BaseValidatorConfig<TValue, TPathKind>
) {
    validate(path, (ctx) => {
        if (isEmpty(ctx.value()))
            return undefined;

        if (getLengthOrSize(ctx.value() as any) > maxLength) {
            if (config?.error) {
                return getOption(config.error as any, ctx);
            } else {
                return maxLengthError(maxLength, { message: getOption(config?.message as any, ctx) });
            }
        }

        return undefined;
    });
}