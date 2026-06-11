import { CdkConnectedOverlay, CdkOverlayOrigin, ConnectedPosition } from '@angular/cdk/overlay';
import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'popover',
  imports: [CdkConnectedOverlay],
  templateUrl: './popover.html',
})
export class Popover {
  readonly origin = input.required<CdkOverlayOrigin>();
  readonly opened = signal(false);

  open() {
    this.opened.set(true);
  }
  close() {
    this.opened.set(false);
  }
  toggle() {
    this.opened.set(!this.opened());
  }
  keydown({ key }: KeyboardEvent) {
    if (key === 'Tab' || key === 'Escape') this.close();
  }

  positions: ConnectedPosition[] = [
    {
      originX: 'start',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'top',
      offsetY: 3,
    },
    {
      originX: 'end',
      originY: 'bottom',
      overlayX: 'end',
      overlayY: 'top',
      offsetY: 3,
    },
    {
      originX: 'start',
      originY: 'top',
      overlayX: 'start',
      overlayY: 'bottom',
      offsetY: -3,
    },
    {
      originX: 'end',
      originY: 'top',
      overlayX: 'end',
      overlayY: 'bottom',
      offsetY: -3,
    },
    {
      originX: 'center',
      originY: 'bottom',
      overlayX: 'center',
      overlayY: 'top',
    },
  ];
}
