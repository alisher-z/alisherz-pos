import { Component, input } from '@angular/core';
import { TreeViewType } from '../../../utils/types';
import { Icon } from '../../icon/icon';

@Component({
  selector: 'tree-view-branch',
  imports: [Icon],
  templateUrl: './branch.html',
  styleUrl: './branch.scss',
})
export class TreeViewBranch {
  branch = input.required<string>();
  leaves = input.required<TreeViewType[]>();
}
