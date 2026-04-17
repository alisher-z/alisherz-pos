import { CdkConnectedOverlay, CdkOverlayOrigin, ConnectedPosition } from '@angular/cdk/overlay';
import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'popup',
  imports: [CdkConnectedOverlay],
  templateUrl: './popup.html'
})
export class Popup {
  origin = input.required<CdkOverlayOrigin>();
  readonly opened = signal(false);

  positions: ConnectedPosition[] = [
    {
      originX: 'start',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'top',
      offsetY: 3
    },
    {
      originX: 'end',
      originY: 'bottom',
      overlayX: 'end',
      overlayY: 'top',
      offsetY: 3
    },
    {
      originX: 'start',
      originY: 'top',
      overlayX: 'start',
      overlayY: 'bottom',
      offsetY: -3
    },
    {
      originX: 'end',
      originY: 'top',
      overlayX: 'end',
      overlayY: 'bottom',
      offsetY: -3
    },
    {
      originX: 'center',
      originY: 'bottom',
      overlayX: 'center',
      overlayY: 'top'
    }
  ];

  show = () => this.opened.set(true);
  hide = () => this.opened.set(false);
  toggle = () => this.opened.set(!this.opened());

  keydow({ key }: KeyboardEvent) {
    if (key === 'Tab' || key === 'Escape') {
      this.hide();
    }
  }
}
