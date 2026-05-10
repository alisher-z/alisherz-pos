import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { KeyValuePipe, NgTemplateOutlet } from '@angular/common';
import { Component, effect, ElementRef, inject, input, model, output, untracked, viewChild } from '@angular/core';
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
  form = model.required<any>();

  done = output<void>();

  bridge = inject(FilterBridge);
  elRef = inject(ElementRef);

  popover = viewChild.required(Popover);

  resizeObserver: ResizeObserver | null = null;
  dialogOpened = false;

  constructor() {
    this.bridge.popover = this.popover;
    this.bridge.searchFields = this.searchFields;
    this.bridge.form = this.form;

    effect(() => this.setParamsForm());
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

  submit(e: SubmitEvent) {
    e.preventDefault();
    this.done.emit();
  }

  removeParam(e: MouseEvent, param: any) {
    e.preventDefault();

    this.bridge.searchParams().delete(param.field);
    this.form.update(value => {
      value[param.field] = [];
      return structuredClone(value);
    });

    this.bridge.closeDropdown();
    this.bridge.resetSearch();
  }

  modelDone(value: any) {
    const paramsMap = this.bridge.searchParams()
    for (const key in value) {
      if (value[key].length < 1) {
        paramsMap.delete(key);
        continue;
      }

      const { label, field } = this.searchFields().find(f => f.field === key)!;
      paramsMap.set(field, {
        label, field, params: new Set(value[key])
      });
    }

    this.bridge.searchParams.set(new Map(paramsMap));
    this.done.emit();
  }

  private destroyObserver() {
    if (!this.resizeObserver) return;

    this.resizeObserver.disconnect();
    this.resizeObserver = null;
  }

  private setParamsForm() {
    const paramsMap = this.bridge.searchParams();
    const formValues = structuredClone(untracked(this.form));

    for (const [key, value] of paramsMap) {
      const params = new Set([
        ...formValues[key],
        ...value.params
      ]);

      formValues[key] = [...params];
    }

    this.form.set(formValues);
  }
}
