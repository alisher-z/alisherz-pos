import { Component, input, output } from '@angular/core';

@Component({
  selector: 'buttonz',
  imports: [],
  templateUrl: './regular-button.html',
  styleUrl: './regular-button.scss',
})
export class RegularButton {
  text = input.required<string>();
  btnType = input<string>('submit', { alias: 'type' });
  disabled = input<boolean>(false);

  tap = output<PointerEvent>();
}
