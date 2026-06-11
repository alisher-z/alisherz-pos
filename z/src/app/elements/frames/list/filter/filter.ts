import { Component } from '@angular/core';
import { IconButton } from '../../../buttons/icon-button/icon-button';
import { ListFrameFilterInput } from './input/input';

@Component({
  selector: 'list-frame-filter',
  imports: [ListFrameFilterInput, IconButton],
  templateUrl: './filter.html',
  styleUrl: './filter.scss',
})
export class ListFrameFilter {
  // searchField = input.required<SearchFields>({ alias: 'fields' });

  submit(e: SubmitEvent) {
    e.preventDefault();
    console.log('hello');
  }
}
