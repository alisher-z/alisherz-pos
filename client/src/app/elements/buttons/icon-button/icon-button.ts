import { Component, input, output } from '@angular/core';
import { Icon } from "../icon/icon";

@Component({
  selector: 'ibutton',
  imports: [Icon],
  templateUrl: './icon-button.html',
  styleUrl: './icon-button.scss',
})
export class IconButton {
  size = input<string>('1.7');
  color = input<string>('blue');
  iconName = input.required<string>({ alias: 'icon' });
  tabindex = input<string>('0', { alias: 'tab' });
  type = input<string>('button');
  disabled = input<boolean>(false);

  bclick = output<PointerEvent>();
  bdown = output<MouseEvent>();
  bup = output<MouseEvent>();
}
