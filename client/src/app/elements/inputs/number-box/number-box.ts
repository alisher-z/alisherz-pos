import { DecimalPipe } from "@angular/common";
import { Component } from "@angular/core";
import { waitForMe } from "../../../utils/wait-for-me";
import { ElExposer } from "../../extensions/element-exposer";
import { BlackBox } from "../black-box/black-box";
import { NumberBoxInputInit } from "./number-box.init";
import { NumberBoxInputService } from "./number-box.service";

@Component({
    selector: 'number',
    templateUrl: './number-box.html',
    styleUrl: './number-box.scss',
    imports: [DecimalPipe, ElExposer, BlackBox],
    providers: [NumberBoxInputService]
})
export class NumberBoxInput extends NumberBoxInputInit {
    // label = input<string | null>(null);
    // value = input<string | null>('0');
    // format = input<string>('1.2-4');
    // tabindex = input<string>('0');
    // disabled = input<boolean>(false);
    // decimal = input<boolean>(true);

    // live = output<string | null>();
    // left = output<string | null>();
    // self = output<HTMLInputElement>();

    // private decimalRegExp = new RegExp(/^(?=(?:\D*\d){0,16}\D*$)-?(?:\d*|\d+\.\d*|\.\d*)$/);
    // private intReqExp = new RegExp(/^(?=(?:\D*\d){0,16}\D*$)-?\d*$/);
    // private leadingZerRexExp = new RegExp(/^(?:-)?0+(?=\d)/);
    // focused = false;
    // onFocus() {
    //     this.focused = true;
    // }
    // onInput(e: Event) {
    //     this.sanitize(<any>e.target);
    //     this.live.emit((e.target as HTMLInputElement).value);
    // }
    // onBlur(e: FocusEvent) {
    //     this.normalize(<any>e.target);
    //     this.live.emit((e.target as HTMLInputElement).value);
    //     this.left.emit((e.target as HTMLInputElement).value);
    //     this.focused = false;
    // }
    // numEl = viewChild<ElementRef<HTMLInputElement>>('el');

    // constructor() {
    //     super();
    //     effect(this.setFocus)
    // }

    // onKeydown(e: KeyboardEvent) { this.guard(e, <any>e.target) }

    // private guard(e: KeyboardEvent, { value, selectionStart: s, selectionEnd: p }: HTMLInputElement) {
    //     if (e.ctrlKey || e.altKey || e.metaKey || e.isComposing || e.key.length > 1)
    //         return;

    //     this.selectGuard(e, <any>e.target);

    //     const next1 = value.substring(0, s ?? 0) + e.key + value.substring(s ?? 0);
    //     const next2 = value.substring(0, p ?? 0) + e.key + value.substring(p ?? 0);

    //     if (!this.status(next1) && !this.status(next2))
    //         e.preventDefault();
    // }

    // private selectGuard(e: KeyboardEvent, target: HTMLInputElement) {
    //     if (target.selectionStart === 0 && target.selectionEnd === target.value.length)
    //         target.value = '';
    // }
    // private status(value: string) {
    //     return this.decimal()
    //         ? this.decimalRegExp.test(value)
    //         : this.intReqExp.test(value);
    // }


    // private sanitize(target: HTMLInputElement) {
    //     if (this.leadingZerRexExp.test(target.value))
    //         target.value = target.value.replace(
    //             this.leadingZerRexExp, m => m.startsWith('-') ? '-' : ''
    //         );
    // }

    // private setFocus = () => {
    //     const el = this.numEl()?.nativeElement;
    //     if (!el) return;

    //     el.focus();
    //     el.select();
    // }

    // private normalize(target: HTMLInputElement) {
    //     const v = +target.value;
    //     target.value = String(isNaN(v) || v === Infinity ? 0 : v);
    // }
    async focus() {
        this.focused = true;

        await waitForMe();
        this.numberInput.select();
    }



    input() {
        this.service.sanitize(this.numberInput);
        this.live.emit(this.service.toNumber(this.numberInput.value));
        this.value.set(<any>this.numberInput.value);
    }



    blur() {
        this.focused = false;

        this.service.normalize(this.numberInput);
        this.value.set(+this.numberInput.value);
        this.left.emit(+this.numberInput.value);
    }



    enter({ value }: HTMLInputElement) {
        const n = this.service.toNumber(value);
        this.value.set(n);
    }



    keydown(e: KeyboardEvent) {
        this.service.guard(e, this.decimal());
    }
}