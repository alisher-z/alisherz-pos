import { Component, inject, input } from '@angular/core';
import { TreeViewType } from '../../utils/types';
import { Icon } from '../icon/icon';
import { TreeViewBranch } from './branch/branch';
import { TreeViewBridge } from './tree-view.bridge';

@Component({
  selector: 'tree-view',
  imports: [TreeViewBranch, Icon],
  providers: [TreeViewBridge],
  templateUrl: './tree-view.html',
  styleUrl: './tree-view.scss',
})
export class TreeView {
  tree = input.required<TreeViewType[]>();
  bridge = inject(TreeViewBridge);

  parentClick() {
    console.log('hi');
  }

  click(field: string, leaf?: boolean) {
    if (leaf) this.bridge.isLeaf = true;

    this.bridge.path.update((p) => [field, ...p]);
  }
}
