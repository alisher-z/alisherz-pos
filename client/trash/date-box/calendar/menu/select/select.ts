import { Component, effect, model } from "@angular/core";
import { BoxLeft } from "../../../../../../extensions/box-left";
import { ScrollIntoView } from "../../../../../../extensions/scroll-into-view";
import { IconButton } from "../../../../../buttons/icon-button/icon-button";

@Component({
    selector: 'calendar-select',
    templateUrl: './select.html',
    styleUrl: './select.scss',
    imports: [IconButton],
    hostDirectives: [{
        directive: BoxLeft,
        outputs: ['clickOutside', 'keydownOutside']
    }],
    host: {
        '(clickOutsid)': 'onOutside()',
        '(keydownOutside)': 'onOutside()'
    }
})
export class CalendarSelect extends ScrollIntoView {
    value = model.required<number>();
    // items = input.required<any[]>();

    label: string | null = null;
    ddShown = false;

    constructor() {
        super();
        effect(() => this.index.set(this.value()));
        effect(() => this.label = this.items()[this.index()]);
    }

    itemClick(index: number) {
        this.value.set(index);
        this.hideDD();
    }

    arrowdown() {
        if (!this.ddShown)
            return this.showDD();

        this.increaseIndex();
    }

    arrowup() {
        if (this.ddShown)
            this.decreaseIndex();
    }

    arrowright() {
        if (this.ddShown)
            this.hideDD()

        this.increaseIndex();
        this.value.set(this.index());
    }

    arrowleft() {
        if (this.ddShown)
            this.hideDD();

        this.decreaseIndex();
        this.value.set(this.index());
    }

    enter() {
        this.value.set(this.index());
        this.hideDD();
    }

    escape(e: Event) {
        if (this.ddShown)
            e.stopPropagation();
        this.index.set(this.value());
        this.hideDD();
    }

    click() {
        this.ddShown = !this.ddShown;
    }

    onOutside() {
        if (this.ddShown)
            this.hideDD();
    }

    showDD() { this.ddShown = true; }
    hideDD() { this.ddShown = false; }
}