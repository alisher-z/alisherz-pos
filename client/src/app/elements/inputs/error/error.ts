import { CdkConnectedOverlay, CdkOverlayOrigin } from '@angular/cdk/overlay';
import { Component, input, signal } from '@angular/core';
import { IconButton } from "../../buttons/icon-button/icon-button";

@Component({
  selector: 'input-error',
  imports: [CdkConnectedOverlay, IconButton],
  templateUrl: './error.html',
  styleUrl: './error.scss',
})
export class InputError {
  readonly origin = input.required<CdkOverlayOrigin>();
  readonly errors = input.required<readonly any[]>()
  readonly opened = signal<boolean>(false);

  show() {
    this.opened.set(true);
  }
  hide() {
    this.opened.set(false);
  }
  toggle() {
    this.opened.set(!this.opened());
  }
}
