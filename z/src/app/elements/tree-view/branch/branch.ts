import { Component, inject, input } from '@angular/core';
import { TreeViewType } from '../../../utils/types';
import { Icon } from '../../icon/icon';
import { TreeViewBridge } from '../tree-view.bridge';

@Component({
  selector: 'tree-view-branch',
  imports: [Icon],
  templateUrl: './branch.html',
  styleUrl: './branch.scss',
})
export class TreeViewBranch {
  branch = input.required<string>();
  leaves = input.required<TreeViewType[]>();
  bridge = inject(TreeViewBridge);

  click(field: string) {
    this.bridge.path.update((p) => [field, ...p]);
  }
}
