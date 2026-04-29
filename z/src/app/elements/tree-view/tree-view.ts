import { Component, effect, input } from '@angular/core';
import { TreeViewType } from '../../utils/types';
import { Icon } from '../icon/icon';
import { TreeViewBranch } from './branch/branch';

@Component({
  selector: 'tree-view',
  imports: [TreeViewBranch, Icon],
  templateUrl: './tree-view.html',
  styleUrl: './tree-view.scss',
})
export class TreeView {
  tree = input.required<TreeViewType[]>();
  constructor() {
    effect(() => console.log(this.tree()));
  }
}
