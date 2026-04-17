import { Component, input, model, output } from '@angular/core';
import { FormCheckboxControl } from '@angular/forms/signals';
import { v4 } from 'uuid';
import { ElExposer } from "../../extensions/element-exposer";

@Component({
  selector: 'check',
  imports: [ElExposer],
  templateUrl: './check-box.html',
  styleUrl: './check-box.scss'
})
export class CheckBoxInput implements FormCheckboxControl {
  readonly label = input<string | null>(null);
  readonly checked = model<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly readonly = input<boolean>(false);
  readonly hiddein = input<boolean>(false);

  readonly live = output<boolean>();
  readonly self = output<HTMLInputElement>();

  readonly id = v4();

  change() {
    this.checked.update(v => !v);
    this.live.emit(this.checked());
  }

  get indeterminate() {
    return this.checked() === null
      ? true
      : false;
  }
}
