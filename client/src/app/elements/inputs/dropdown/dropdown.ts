import { CdkOverlayOrigin } from "@angular/cdk/overlay";
import { NgTemplateOutlet } from '@angular/common';
import { Component, contentChild, effect, ElementRef, inject, input, model, output, TemplateRef, viewChild } from '@angular/core';
import { FormValueControl, ValidationError, WithOptionalFieldTree } from '@angular/forms/signals';
import { v4 } from 'uuid';
import { HttpBaseZ } from '../../../components/http-base';
import { Popup } from "../../popup/popup";
import { DropdownBridge } from './dropdown.bridge';
import { DropdownInput } from "./input/input";
import { DropdownTable } from "./table/table";

@Component({
  selector: 'dropdown',
  templateUrl: './dropdown.html',
  styleUrl: './dropdown.scss',
  imports: [DropdownInput, DropdownTable, NgTemplateOutlet, CdkOverlayOrigin, Popup],
  providers: [DropdownBridge]
})
export class Dropdown implements FormValueControl<string | null> {
  value = model<string | null>(null);
  disabled = input<boolean>(false);
  invalid = input<boolean>(false);
  touched = input<boolean>(false);
  required = input<boolean>(false);
  errors = input<readonly WithOptionalFieldTree<ValidationError>[]>([]);

  label = input<string | null>(null);
  displayField = input<string>('name', { alias: 'display_field' });

  http = input.required<HttpBaseZ>();
  isHead = input<boolean>(true);
  numberOfColumns = input<number>();

  bridge = inject(DropdownBridge);
  elRef = inject(ElementRef);
  elID = v4();
  resizeObserver: ResizeObserver | null = null;

  popup = viewChild.required(Popup);
  trContent = contentChild<TemplateRef<any>>('row');

  self = output<HTMLInputElement | null>();
  live = output<any>();
  left = output<any>();

  constructor() {
    effect(() => this.http().asSinglePage());
    effect(() => this.self.emit(this.bridge.textbox()));
    effect(() => this.live.emit(this.bridge.item()));

    this.bridge.http = this.http;
    this.bridge.popup = this.popup;
    this.bridge.ID = this.elID;
    this.bridge.isHead = this.isHead;
    this.bridge.field = this.displayField;
    this.bridge.value = this.value;
    this.bridge.disabled = this.disabled;
    this.bridge.numberOfColumns = this.numberOfColumns;
    this.bridge.left = this.left;
  }

  ngOnInit() {
    this.resizeObserver = new ResizeObserver(e =>
      this.bridge.tableMinWidth.set((e[0].contentRect.width / 10) + 'rem')
    );

    this.resizeObserver.observe(this.elRef.nativeElement);
  }

  ngOnDestroy() {
    if (this.resizeObserver)
      this.resizeObserver.disconnect();
    this.resizeObserver = null;
  }
}
