import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { KeyValuePipe, NgTemplateOutlet } from '@angular/common';
import {
  afterRenderEffect,
  Component,
  effect,
  ElementRef,
  inject,
  input,
  viewChild,
} from '@angular/core';
import { SearchFields } from '../../../http/types';
import { IconButton } from '../../buttons/icon-button/icon-button';
import { Popover } from '../../popups/popover/popover';
import { FilterDropdown } from './dropdown/dropdown';
import { FilterBridge } from './filter.bridge';
import { FilterInput } from './filter.input';

@Component({
  selector: 'filter',
  imports: [
    IconButton,
    CdkOverlayOrigin,
    Popover,
    FilterDropdown,
    FilterInput,
    KeyValuePipe,
    NgTemplateOutlet,
    IconButton,
  ],
  providers: [FilterBridge],
  templateUrl: './filter.html',
  styleUrl: './filter.scss',
})
export class Filter {
  searchFields = input.required<SearchFields[]>({ alias: 'fields' });

  bridge = inject(FilterBridge);
  elRef = inject(ElementRef);

  popover = viewChild.required(Popover);

  resizeObserver: ResizeObserver | null = null;

  constructor() {
    this.bridge.popover = this.popover;
    this.bridge.searchFields = this.searchFields;

    afterRenderEffect({
      read: () => {
        // this.popover().open();
      },
    });
    effect(() => console.log(this.bridge.searchParams()));
  }

  ngAfterViewInit() {
    this.destroyObserver();
    this.resizeObserver = new ResizeObserver((e) =>
      this.bridge.parentWidth.set(`${e[0].contentRect.width / 10}rem`),
    );

    this.resizeObserver.observe(this.elRef.nativeElement);
  }

  ngOnDestroy() {
    this.destroyObserver();
  }

  private destroyObserver() {
    if (!this.resizeObserver) return;

    this.resizeObserver.disconnect();
    this.resizeObserver = null;
  }
}
