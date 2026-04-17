import { Directive, ElementRef, inject, output } from "@angular/core";

@Directive({
    selector: '[el-exposer]'
})
export class ElExposer<T> {
    elRef = inject(ElementRef<T>);
    element = output<T>();

    ngOnInit() {
        this.element.emit(this.native);
    }

    get native() {
        return this.elRef.nativeElement as T;
    }

    get parent() {
        return (this.native as HTMLElement).parentElement;
    }
}