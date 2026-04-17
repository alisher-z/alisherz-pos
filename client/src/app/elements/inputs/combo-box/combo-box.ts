import { CdkOverlayOrigin } from "@angular/cdk/overlay";
import { NgTemplateOutlet } from "@angular/common";
import { Component, contentChild, effect, inject, input, model, output, TemplateRef, untracked, viewChild } from '@angular/core';
import { FormValueControl, ValidationError, WithOptionalField } from "@angular/forms/signals";
import { v4 } from 'uuid';
import { HttpBaseZ } from '../../../components/http-base';
import { ElExposer } from "../../extensions/element-exposer";
import { Popup } from "../../popup/popup";
import { ComboBoxBridge } from './combo-box.bridge';
import { ComboBoxInput } from "./input/input";
import { ComboBoxTable } from "./table/table";

/**
 * Orchestrates the search input, the popup overlay, and the virtualized results table.
 * Extends ElExposer to provide access to the underlying native element.
**/
@Component({
  selector: 'combo',
  templateUrl: './combo-box.html',
  styleUrl: './combo-box.scss',
  imports: [ComboBoxInput, ComboBoxTable, CdkOverlayOrigin, Popup, NgTemplateOutlet],
  providers: [ComboBoxBridge]
})
export class ComboBox extends ElExposer<HTMLElement> implements FormValueControl<string | null> {
  constructor() {
    super();
    this.bridge.http = this.http;
    this.bridge.popup = this.popup;
    this.bridge.searchInput = this.searchInput;
    this.bridge.inputID = this.elID;
    this.bridge.value = this.value;
    this.bridge.displayField = this.displayField;
    this.bridge.isHead = this.isHead;
    this.bridge.isFoot = this.isFoot;
    this.bridge.numberOfColumns = this.numberOfColumns;
    // this.bridge.left = this.left;


    /**
     * Effect: Configure Virtual Table
     * Ensures the virtual table has a buffer (chunkExtension) to keep 
     * scrolling smooth during rapid keyboard navigation.
    **/
    effect(() => {
      const tableRef = this.bridge.tableRef();
      tableRef.chunkExtension = 5;
    });

    // Exposes the native HTMLInputElement to parent components via the 'self' output.
    effect(() => this.self.emit(
      this.searchInput().searchInputRef().nativeElement
    ));

    effect(() => this.live.emit(this.bridge.item()));
    effect(() => {
      const item = this.bridge.item();
      const value = untracked(this.value);
      if (!value || item?.pk === this.itemPK)
        return;

      this.left.emit(item);
      this.itemPK = item?.pk;
    })
  }

  displayField = input<string>('name');
  label = input<string | null>(null);
  value = model<string | null>(null);
  disabled = input<boolean>(false);
  invalid = input<boolean>(false);
  touched = input<boolean>(false);
  required = input<boolean>(false);
  errors = input<readonly WithOptionalField<ValidationError>[]>([]);

  isHead = input<boolean>(true);
  isFoot = input<boolean>(false);
  numberOfColumns = input<number>();

  // Outputs the native input element for external focus management.
  self = output<HTMLInputElement | null>();
  live = output<any>();
  left = output<any>();

  // Generates a unique ID for ARIA/Accessibility linking.
  elID = v4();

  http = input.required<HttpBaseZ>();

  popup = viewChild.required(Popup);
  searchInput = viewChild.required(ComboBoxInput);
  trContent = contentChild<TemplateRef<any>>('row');

  bridge = inject(ComboBoxBridge);
  resizeObserver: ResizeObserver | null = null;
  itemPK?: string;

  /**
   * Measures the initial width of the host element to set the minimum width of 
   * the dropdown table, ensuring visual alignment.
  **/
  override ngOnInit(): void {
    this.resizeObserver = new ResizeObserver(e =>
      this.bridge.tableMinWidth.set((e[0].contentRect.height / 10) + 'rem')
    );
    this.resizeObserver.observe(this.native);
  }

  ngOnDestroy() {
    if (this.resizeObserver)
      this.resizeObserver.disconnect();
    this.resizeObserver = null;
  }
}
