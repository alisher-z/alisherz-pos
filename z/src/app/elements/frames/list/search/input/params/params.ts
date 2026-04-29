import { JsonPipe, KeyValuePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { IconButton } from '../../../../../buttons/icon-button/icon-button';
import { ListFrameSearchBridge } from '../../search.bridge';

@Component({
  selector: 'list-frame-search-params',
  imports: [IconButton, KeyValuePipe, JsonPipe],
  templateUrl: './params.html',
  styleUrl: './params.scss',
})
export class ListFrameSearchParams {
  bridge = inject(ListFrameSearchBridge);
}
