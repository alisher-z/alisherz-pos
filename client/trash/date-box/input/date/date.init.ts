import { Directive, model, output, signal } from "@angular/core";

@Directive()
export class DateBoxDateInputInit {
    value = model.required<Date | null>();

    blurE = output<void>();
    focusE = output<void>();
    escapeE = output<void>();
    downArrowE = output<void>();
    clickDownE = output<void>();
    selfDateE = output<HTMLInputElement>();
    selfTextE = output<HTMLInputElement>();

    dateInput: HTMLInputElement | null = null;
    textInput: HTMLInputElement | null = null;
    oldDate: Date | null = null;
    focused = signal(false);
}