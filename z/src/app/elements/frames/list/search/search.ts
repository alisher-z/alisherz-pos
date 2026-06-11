import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { Component, ElementRef, inject, input, viewChild } from '@angular/core';
import { SearchFields } from '../../../../http/types';
import { Popover } from '../../../popups/popover/popover';
import { ListFrameSearchDropdown } from './dropdown/dropdown';
import { ListFrameSearchInput } from './input/input';
import { ListFrameSearchBridge } from './search.bridge';

@Component({
  selector: 'list-frame-search',
  templateUrl: './search.html',
  styleUrl: './search.scss',
  imports: [Popover, CdkOverlayOrigin, ListFrameSearchDropdown, ListFrameSearchInput],
  providers: [ListFrameSearchBridge],
})
export class ListFrameSearch {
  fields = input.required<SearchFields[]>();
  popover = viewChild.required(Popover);
  searchInput = viewChild.required(ListFrameSearchInput);

  resizeObserver: ResizeObserver | null = null;

  elRef: ElementRef<HTMLElement> = inject(ElementRef);
  bridge = inject(ListFrameSearchBridge);

  constructor() {
    this.bridge.searchFields = this.fields;
    this.bridge.popover = this.popover;
    this.bridge.searchInput = this.searchInput;
  }

  ngAfterViewInit() {
    this.destroyObserver();
    this.resizeObserver = new ResizeObserver((e) =>
      this.bridge.inputWidth.set(`${e[0].contentRect.width / 10}rem`),
    );

    this.resizeObserver.observe(this.elRef.nativeElement);
  }

  ngOnDestroy() {
    this.destroyObserver();
  }

  click() {
    this.popover()?.open();
  }

  destroyObserver() {
    if (!this.resizeObserver) return;

    this.resizeObserver.disconnect();
    this.resizeObserver = null;
  }
}
