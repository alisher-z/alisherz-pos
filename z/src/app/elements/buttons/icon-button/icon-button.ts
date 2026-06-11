import { Component, input, output } from '@angular/core';
import { Icon } from '../../icon/icon';

@Component({
  selector: 'ibutton',
  imports: [Icon],
  templateUrl: './icon-button.html',
  styleUrl: './icon-button.scss',
})
export class IconButton {
  iname = input.required<string>();
  weight = input<string | number>(300);
  filled = input<string | number>(1);
  size = input<string | number>(3);
  color = input<string>('blue');
  tabindex = input<string | number>(0, { alias: 'index' });
  type = input<string>('button');
  disabled = input<boolean>(false);

  tap = output<PointerEvent>();
  tapdown = output<MouseEvent>();
  tapup = output<MouseEvent>();
}
