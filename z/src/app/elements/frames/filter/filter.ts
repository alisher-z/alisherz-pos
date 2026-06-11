import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { Component, ElementRef, inject, input, output, viewChild } from '@angular/core';
import { IconButton } from '../../buttons/icon-button/icon-button';
import { Popover } from '../../popups/popover/popover';
import { FilterDropdown } from './dropdown/dropdown';
import { FilterBridge } from './filter.bridge';
import { FilterInput } from './filter.input';
import { FilterModal } from './modal/modal';
import { FilterParams } from "./params/params";
import { FilterBluePrint } from './utils/filter.blueprint';

@Component({
  selector: 'filter',
  imports: [IconButton, CdkOverlayOrigin, Popover, FilterDropdown, FilterInput, IconButton, FilterModal, FilterParams],
  providers: [FilterBridge],
  templateUrl: './filter.html',
  styleUrl: './filter.scss',
})
export class Filter {
  constructor() {
    this.bridge.popover = this.popover;
    this.bridge.structure = this.structure;
  }
  readonly structure = input.required<FilterBluePrint<unknown>>();

  readonly done = output<void>();

  readonly popover = viewChild.required(Popover);

  readonly elRef = inject(ElementRef);
  readonly bridge = inject(FilterBridge);

  submit(e: SubmitEvent) {
    e.preventDefault();
    this.done.emit();
  }

  modelSubmit(values: Record<string, any[]>) {
    const searchParams = this.bridge.searchParams();

    for (const key in values) {
      if (values[key].length < 1)
        searchParams.delete(key);

      else {
        const { label, field } = this.bridge.searchFields().find(f => f.field === key)!;
        searchParams.set(key, {
          label, field, params: new Set(values[key])
        });
      }
    }

    this.bridge.searchParams.set(new Map(searchParams));
    this.done.emit();
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

























































































  // searchFields = input.required<SearchFields[]>({ alias: 'fields' });

  // structure_!: FilterBluePrint<any>;

  // form_: FieldTree<any, string | number>;
  // form = model.required<any>();






  resizeObserver: ResizeObserver | null = null;
  dialogOpened = false;

  // constructor() {
  //   this.bridge.popover = this.popover;
  //   this.bridge.searchFields = this.searchFields;
  //   this.bridge.form = this.form;

  //   effect(() => this.structure_ = this.structure());
  //   this.form_ = this.structure_.form;

  //   effect(() => this.setParamsForm());
  // }





  // removeParam(e: MouseEvent, param: any) {
  //   e.preventDefault();

  //   this.bridge.searchParams().delete(param.field);
  //   this.form.update(value => {
  //     value[param.field] = [];
  //     return structuredClone(value);
  //   });

  //   this.bridge.closeDropdown();
  //   this.bridge.resetSearch();
  // }

  // modelDone(value: any) {
  //   const paramsMap = this.bridge.searchParams()
  //   for (const key in value) {
  //     if (value[key].length < 1) {
  //       paramsMap.delete(key);
  //       continue;
  //     }

  //     const { label, field } = this.searchFields().find(f => f.field === key)!;
  //     paramsMap.set(field, {
  //       label, field, params: new Set(value[key])
  //     });
  //   }

  //   this.bridge.searchParams.set(new Map(paramsMap));
  //   this.done.emit();
  // }



  // private setParamsForm() {
  //   const paramsMap = this.bridge.searchParams();
  //   const formValues = structuredClone(untracked(this.form));

  //   for (const [key, value] of paramsMap) {
  //     const params = new Set([
  //       ...formValues[key],
  //       ...value.params
  //     ]);

  //     formValues[key] = [...params];
  //   }

  //   this.form.set(formValues);
  // }
}
