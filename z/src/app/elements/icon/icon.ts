import { Component, input } from '@angular/core';

@Component({
  selector: 'icon',
  templateUrl: './icon.html',
  styleUrl: './icon.scss',
  imports: [],
  host: {
    '[attr.disabled]': 'disabled()?"":null',
    '[style.--weight]': 'weight()',
    '[style.--fill]': 'filled()',
    '[style.--size]': 'size()+"rem"',
    '[style.--color]': 'color()',
  },
})
export class Icon {
  iname = input.required<string>();
  weight = input<string | number>(300);
  filled = input<string | number>(1);
  size = input<string | number>(2.4);
  color = input<string>('blue');
  disabled = input<boolean>(false);
}
