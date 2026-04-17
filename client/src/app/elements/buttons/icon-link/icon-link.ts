import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from "../icon/icon";

@Component({
  selector: 'ilink',
  imports: [RouterLink, Icon],
  templateUrl: './icon-link.html',
  styleUrl: './icon-link.scss',
})
export class IconLink {
  link = input.required<string>();
  iconName = input.required<string>({ alias: 'icon' });
  size = input<string>('1.7');
  color = input<string>('blue');
}
