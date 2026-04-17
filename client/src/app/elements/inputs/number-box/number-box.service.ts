import { Injectable } from "@angular/core";

@Injectable()
export class NumberBoxInputService {
   #decimalRegExp = new RegExp(/^(?=(?:\D*\d){0,16}\D*$)-?(?:\d*|\d+\.\d*|\.\d*)$/);
   #intReqExp = new RegExp(/^(?=(?:\D*\d){0,16}\D*$)-?\d*$/);
   #leadingZerRexExp = new RegExp(/^(?:-)?0+(?=\d)/);

   sanitize(input: HTMLInputElement) {
      const value = input.value;
      const ok = this.#leadingZerRexExp.test(value);

      if (ok)
         input.value = value
            .replace(
               this.#leadingZerRexExp,
               m => m.startsWith('-') ? '-' : ''
            );
   }

   normalize(input: HTMLInputElement) {
      const value = +input.value;
      input.value = String(isNaN(value) || value === Infinity ? 0 : value);
   }

   toNumber(value: string | null) {
      const n = Number(value);

      return isNaN(n) || n === Infinity ? 0 : n;
   }

   guard(e: KeyboardEvent, decimal: boolean) {
      if (e.ctrlKey || e.altKey || e.metaKey || e.isComposing || e.key.length > 1)
         return;

      const { selectionStart, selectionEnd, value } = <HTMLInputElement>e.target;

      this.#selectionGuard(<any>e.target);

      const next1 = value.substring(0, selectionStart ?? 0) + e.key + value.substring(selectionStart ?? 0);
      const next2 = value.substring(0, selectionEnd ?? 0) + e.key + value.substring(selectionEnd ?? 0);

      if (!this.#status(next1, decimal) && !this.#status(next2, decimal))
         e.preventDefault();
   }

   #selectionGuard(input: HTMLInputElement) {
      const { selectionStart, selectionEnd, value } = input;
      if (selectionStart === 0 && selectionEnd === value.length)
         input.value = '';
   }

   #status(value: string, decimal: boolean) {
      return decimal
         ? this.#decimalRegExp.test(value)
         : this.#intReqExp.test(value);
   }
}