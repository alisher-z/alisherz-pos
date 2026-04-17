import { Directive, HostListener, output } from "@angular/core";
import { ElExposer } from "../elements/extensions/element-exposer";

@Directive()
export class BoxLeft extends ElExposer<HTMLElement> {
    clickInside = output<MouseEvent>()
    clickOutside = output<MouseEvent>()

    clickdownInside = output<MouseEvent>();
    clickdownOutside = output<MouseEvent>();

    keydownInside = output<KeyboardEvent>();
    keydownOutside = output<KeyboardEvent>();

    keyupInside = output<KeyboardEvent>();
    keyupOutside = output<KeyboardEvent>();

    @HostListener('document:click', ['$event'])
    click(e: MouseEvent) {
        if (this.native.contains(<Node>e.target))
            this.clickInside.emit(e);

        else
            this.clickOutside.emit(e);
    }

    @HostListener('document:mousedown', ['$event'])
    mousedown(e: MouseEvent) {
        if (this.native.contains(<Node>e.target))
            this.clickdownInside.emit(e);

        else
            this.clickdownOutside.emit(e);
    }

    @HostListener('document:keydown', ['$event'])
    keydown(e: KeyboardEvent) {
        if (this.native.contains(<Node>e.target))
            this.keydownInside.emit(e);

        else
            this.keydownOutside.emit(e);
    }

    @HostListener('document:keyup', ['$event'])
    keyup(e: KeyboardEvent) {
        if (this.native.contains(<Node>e.target))
            this.keyupInside.emit(e);

        else
            this.keyupOutside.emit(e);
    }
}