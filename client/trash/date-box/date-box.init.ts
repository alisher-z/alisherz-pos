import { Directive, input, model, output, signal } from "@angular/core";
import { FormValueControl } from "@angular/forms/signals";

@Directive()
export class DateBoxInputInit implements FormValueControl<Date | null> {
    readonly value = model<Date | null>(null);
    readonly disabled = input(false);
    readonly label = input<string | null>(null);
    readonly timeShow = input(false, { alias: 'time' });

    calShown = signal(false);
    calClicked = signal(false);
    dateInput: HTMLInputElement | null = null;
    textInput: HTMLInputElement | null = null;

    left = output<Date | null>();
    element = output<HTMLInputElement | null>();

    showCalendar() {
        this.calShown.set(true);
    }
    hideCalendar() {
        this.calShown.set(false);
    }
    toggleCalendar() {
        this.calShown.set(!this.calShown());
    }
}