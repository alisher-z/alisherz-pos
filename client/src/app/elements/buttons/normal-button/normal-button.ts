import { Component, input, output } from '@angular/core';

@Component({
  selector: 'buttonz',
  imports: [],
  templateUrl: './normal-button.html',
  styleUrl: './normal-button.scss',
})
export class NormalButton {
  readonly text = input<string>('Submit');
  readonly type = input<string>('button');
  readonly disabled = input<boolean>(false);
  bclick = output<PointerEvent>();

}
