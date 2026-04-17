import { Directive, input, model, output } from "@angular/core";
import { FormValueControl, ValidationError, WithOptionalField } from '@angular/forms/signals';
import { v4 } from "uuid";

@Directive()
export class InputCommonFiels<T> implements FormValueControl<string | null> {
    readonly label = input<string | null>(null);
    readonly value = model<string | null>(null);
    readonly touched = model<boolean>(false);
    readonly disabled = input<boolean>(false);
    readonly readonly = input<boolean>(false);
    readonly required = input<boolean>(false);
    readonly hiddein = input<boolean>(false);
    readonly invalid = input<boolean>(false);
    readonly errors = input<readonly WithOptionalField<ValidationError>[]>([]);

    readonly live = output<string | null>();
    readonly left = output<string | null>();
    readonly self = output<T>();
    readonly id = v4();

    input({ value }: HTMLInputElement) {
        this.value.set(value);
        this.live.emit(value);
    }

    blur({ value }: HTMLInputElement) {
        this.value.set(value);
        this.left.emit(value);
        this.touched.set(true);
    }
}