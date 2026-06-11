import { Component, DOCUMENT, effect, inject, Renderer2, signal } from '@angular/core';
import { RouterLinkWithHref, RouterOutlet } from '@angular/router';
import { IconButton } from './elements/buttons/icon-button/icon-button';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [RouterOutlet, IconButton, RouterLinkWithHref],
})
export class App {
  protected readonly title = signal('alisherz');
  private readonly renderer = inject(Renderer2);
  private readonly document = inject(DOCUMENT);

  isDarkTheme = signal(false);
  // isDarkTheme = signal(window.matchMedia('(prefers-color-scheme:dark)').matches);

  constructor() {
    effect(() =>
      this.renderer.setAttribute(
        this.document.documentElement,
        'data-theme',
        this.isDarkTheme() ? 'dark' : 'light',
      ),
    );
  }
}
