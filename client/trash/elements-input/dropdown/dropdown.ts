import { CdkOverlayOrigin } from "@angular/cdk/overlay";
import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  contentChild,
  effect,
  inject,
  input,
  model,
  output,
  signal,
  TemplateRef,
  viewChild
} from '@angular/core';
import { FormValueControl, ValidationError, WithOptionalField } from "@angular/forms/signals";
import { v4 } from "uuid";
import { ElExposer } from "../../extensions/element-exposer";
import { Popup } from "../../popup/popup";
import { InputError } from "../error/error";
import { DropdownInputUtils } from './dropdown.utils';
import { DropdownText } from "./input/input";
import { DropdownList } from "./list/list";

@Component({
  selector: 'dropdown',
  templateUrl: './dropdown.html',
  styleUrl: './dropdown.scss',
  imports: [
    DropdownText,
    DropdownList,
    NgTemplateOutlet,
    CdkOverlayOrigin,
    Popup,
    InputError
  ],
  providers: [DropdownInputUtils],
  // host: { '[style.--self-width]': 'selfWidth()' }
})

export class DropdownInput extends ElExposer<HTMLElement> implements FormValueControl<string | null> {
  constructor() {
    super();
    this.utils.list = this.list;
    this.utils.filterBy = this.filterBy;
    this.utils.dropdownSearch = this.dropdownSearch;
    this.utils.dropdownList = this.dropdownList;
    this.utils.popup = this.popup;



    effect(() => this.self.emit(this.dropdownSearch().searchInput));
  }
  ngAfterViewInit() {
    const { width } = this.native.getBoundingClientRect();
    this.dropdownList().parentWidth.set((width / 10) + 'rem');
  }





  readonly label = input<string | null>(null);
  readonly value = model<string | null>(null);
  readonly touched = model<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly readonly = input<boolean>(false);
  readonly required = input<boolean>(false);
  readonly invalid = input<boolean>(false);
  readonly errors = input<readonly WithOptionalField<ValidationError>[]>([]);



  readonly list = input.required<any[]>();
  readonly filterBy = input<string>('name');



  readonly left = output<any | null>();
  readonly self = output<HTMLInputElement>();



  readonly id = v4();

  selfWidth = signal('0rem');

  utils = inject(DropdownInputUtils);



  row = contentChild<TemplateRef<any> | null>('row');



  dropdownSearch = viewChild.required(DropdownText);
  dropdownList = viewChild.required(DropdownList);
  popup = viewChild.required(Popup);





  textInputBlur(item: any) {
    this.touched.set(true);
    this.left.emit(item);
  }
}
