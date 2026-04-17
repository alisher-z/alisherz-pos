import { ChangeDetectionStrategy, Component, effect, inject, input } from '@angular/core';
import { ViewBoxSVG } from '../extensions/svg';
import { IconService } from '../services/icon';

@Component({
  selector: 'icon',
  templateUrl: './icon.html',
  styleUrl: './icon.scss',
  imports: [ViewBoxSVG],
  providers: [IconService],
  host: {
    '[style.--size]': `size()+'rem'`,
    '[style.--color]': 'color()'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Icon {
  size = input<string>('2');
  color = input<string>('red');
  name = input.required<string>({ alias: 'icon' });
  tabindex = input<string>('-1', { alias: 'tab' });

  service = inject(IconService);
  path = '';

  constructor() {
    effect(() => {
      const name = this.name();
      const icon = this.service[name as keyof IconService];
      this.path = icon;
    })
  }
}
