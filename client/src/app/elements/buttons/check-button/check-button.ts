import { Component, computed, input, model } from '@angular/core';
import { FormCheckboxControl } from '@angular/forms/signals';

@Component({
  selector: 'check-button',
  imports: [],
  templateUrl: './check-button.html',
  styleUrl: './check-button.scss',
})
export class CheckButton implements FormCheckboxControl {
  checked = model<boolean>(false);
  disabled = input<boolean>(false);
  captions = input.required<string[]>();
  tabindex = input<string>('0', { alias: 'tab' });

  caption = computed(() => this.captions()[+this.checked()]);

  toggle() {
    this.checked.update(v => !v);
  }
}
