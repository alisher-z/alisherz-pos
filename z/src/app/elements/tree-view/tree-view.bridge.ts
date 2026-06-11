import { Injectable, signal } from '@angular/core';

@Injectable()
export class TreeViewBridge {
  path = signal<string[]>([]);
  isLeaf = false;

  click(field: string, leaf?: boolean) {
    this.createPath(field, leaf);
  }

  mousedown(field: string, leaf?: boolean) {
    this.createPath(field, leaf);
  }

  createPath(field: string, leaf?: boolean) {
    if (leaf) this.isLeaf = true;

    this.path.update((p) => [field, ...p]);
  }
}
