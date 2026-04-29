import { Component } from '@angular/core';
import { TreeView } from '../elements/tree-view/tree-view';
import { TreeViewType } from '../utils/types';

@Component({
  selector: 'home',
  imports: [TreeView],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  tree: TreeViewType[] = [
    { label: 'Ahmad', field: 'ahmad' },
    { label: 'Mahmood', field: 'mahmoood' },
    { label: 'Kalbi', field: 'kalbi' },
    {
      label: 'Ice Giants',
      children: [
        { label: 'Uranus', field: 'uranus' },
        { label: 'Neptune', field: 'neptune' },
        {
          label: 'Ice Giants',
          children: [
            { label: 'Uranus', field: 'uranus' },
            { label: 'Neptune', field: 'neptune' },
            { label: 'Test', field: 'test' },
            {
              label: 'Gas Giants',
              children: [
                { label: 'Jupitor', field: 'jupitor' },
                { label: 'Saturn', field: 'saturn' },
              ],
            },
            { label: 'Radica', field: 'radica' },
          ],
        },
      ],
    },
    { label: 'Maqsood', field: 'maqsood' },
    {
      label: 'Ice Giants1',
      children: [
        { label: 'Uranus', field: 'uranus' },
        { label: 'Neptune', field: 'neptune' },
        {
          label: 'Ice Giants',
          children: [
            { label: 'Uranus', field: 'uranus' },
            { label: 'Neptune', field: 'neptune' },
            { label: 'Test', field: 'test' },
            {
              label: 'Gas Giants',
              children: [
                { label: 'Jupitor', field: 'jupitor' },
                { label: 'Saturn', field: 'saturn' },
              ],
            },
            { label: 'Radica', field: 'radica' },
          ],
        },
      ],
    },
    { label: 'Test1', field: 'test' },
  ];
}
