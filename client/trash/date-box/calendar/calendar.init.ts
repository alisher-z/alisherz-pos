import { Directive, effect, linkedSignal, model, output } from "@angular/core";
import { BoxLeft } from "../../../../extensions/box-left";
import { ElExposer } from "../../../extensions/element-exposer";

@Directive({
    hostDirectives: [{
        directive: BoxLeft,
        outputs: ['clickdownInside', 'keydownOutside', 'keyupInside', 'clickOutside']
    }],
    host: {
        '[class.visible]': 'visible()',
        '(clickdownInside)': 'calendarClick.emit()',
        '(keydownOutside)': 'keydownOutside($event)',
        '(keyupInside)': 'keyupInside($event)',
        '(clickOutside)': 'clickOutside()'
    }
})
export abstract class CalendarInputInit extends ElExposer<HTMLElement> {
    abstract keydownOutside(e: KeyboardEvent): void;
    abstract keyupInside(e: KeyboardEvent): void;
    abstract clickOutside(): void;

    value = model.required<Date | null>();
    visible = model<boolean>(true);

    menu = linkedSignal(() => this.value() ?? new Date);
    days = linkedSignal(() => this.value());

    dayClickDownE = output<void>();
    todayDown = output<void>();
    calendarClick = output<void>();

    constructor() {
        super();
        effect(() => this.value.set(this.days()));
    }
}