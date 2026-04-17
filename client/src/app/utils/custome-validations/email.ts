import { emailError, PathKind, SchemaPath, SchemaPathRules, validate } from "@angular/forms/signals";
import { BaseValidatorConfig, getOption, isEmpty } from "../util";

const EMAIL_REGEXP = /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export function email<TPathKind extends PathKind = PathKind.Root>(
    path: SchemaPath<string | null, SchemaPathRules.Supported, TPathKind>,
    config?: BaseValidatorConfig<string | null, TPathKind>
) {
    validate(path, (ctx) => {
        if (isEmpty(ctx.value()))
            return undefined;

        if (!EMAIL_REGEXP.test(ctx.value()!)) {
            if (config?.error)
                return getOption(config.error, ctx);
            else
                return emailError({ message: getOption(config?.message, ctx) });
        }

        return undefined;
    });
}