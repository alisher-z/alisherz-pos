import { Directive, effect, ElementRef, inject, input, model, Renderer2, viewChildren } from "@angular/core";
import { ElExposer } from "../elements/extensions/element-exposer";

@Directive()
export class ScrollIntoView extends ElExposer<HTMLElement> {
    index = model<number>(0);
    items = input.required<any[]>();
    renderer = inject(Renderer2);
    scrollRefs = viewChildren<ElementRef<HTMLElement>>('scroll');

    scrollTo(el: HTMLElement) {
        el.scrollIntoView({ behavior: 'instant', block: 'center' });
    }

    constructor() {
        super();
        effect(this.onIndex)
    }

    increaseIndex = () =>
        this.index() < this.items().length - 1
            ? this.setIndex(this.index() + 1)
            : null;

    decreaseIndex = (negate: boolean = false) =>
        (negate && this.index() >= 0) || (!negate && this.index() > 0)
            ? this.setIndex(this.index() - 1)
            : null;

    setIndex = (index: number) => this.index.set(index);

    onIndex = () => {
        const index = this.index();
        if (this.elRefs.length < 1 || index < 0)
            return;

        const el = this.elRefs[index]?.nativeElement;
        if (!el) return;

        this.scrollTo(el);
    }

    get elRefs() {
        return this.scrollRefs();
    }
}