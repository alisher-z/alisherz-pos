import { Injectable, signal } from '@angular/core';
import { SearchFields } from '../../../../http/types';

@Injectable()
export class ListFrameFilterBridge {
  searchFields = signal<SearchFields | null>(null);
}
