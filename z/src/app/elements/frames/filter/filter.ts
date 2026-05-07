import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { KeyValuePipe, NgTemplateOutlet } from '@angular/common';
import { Component, ElementRef, inject, input, viewChild } from '@angular/core';
import { FieldTree } from '@angular/forms/signals';
import { SearchFields } from '../../../http/types';
import { IconButton } from '../../buttons/icon-button/icon-button';
import { Popover } from '../../popups/popover/popover';
import { FilterDropdown } from './dropdown/dropdown';
import { FilterBridge } from './filter.bridge';
import { FilterInput } from './filter.input';
import { FilterModal } from './modal/modal';

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
    FilterModal,
  ],
  providers: [FilterBridge],
  templateUrl: './filter.html',
  styleUrl: './filter.scss',
})
export class Filter {
  searchFields = input.required<SearchFields[]>({ alias: 'fields' });
  form = input.required<FieldTree<any, string | number>>();

  bridge = inject(FilterBridge);
  elRef = inject(ElementRef);

  popover = viewChild.required(Popover);

  resizeObserver: ResizeObserver | null = null;

  constructor() {
    this.bridge.popover = this.popover;
    this.bridge.searchFields = this.searchFields;

    // effect(() => {
    //   const paramsMap = this.bridge.searchParams();
    //   const formValues: any = structuredClone(untracked(untracked(this.form)().value));

    //   for (const [key, value] of paramsMap)
    //     formValues[key] = [
    //       ...formValues[key],
    //       ...value.params
    //     ];

    //   untracked(this.form)().value.set(formValues);
    // });
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

  removeParam(e: MouseEvent, param: any) {
    e.preventDefault();
    this.bridge.searchParams().delete(param.field);
    this.bridge.closeDropdown();
    this.bridge.resetSearch();
  }

  private destroyObserver() {
    if (!this.resizeObserver) return;

    this.resizeObserver.disconnect();
    this.resizeObserver = null;
  }
}
