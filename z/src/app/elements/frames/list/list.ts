import { Component, input } from '@angular/core';
import { SearchFields } from '../../../http/types';
import { IconButton } from '../../buttons/icon-button/icon-button';
import { RegularButton } from '../../buttons/regular-button/regular-button';
import { ListFrameFilter } from './filter/filter';

@Component({
  selector: 'list-frame',
  imports: [RegularButton, IconButton, ListFrameFilter],
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class ListFrame {
  searchFields = input.required<SearchFields[]>();
}
