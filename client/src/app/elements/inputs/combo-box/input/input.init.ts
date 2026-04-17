import { Directive, effect, ElementRef, inject, signal, viewChild } from "@angular/core";
import { debounce, form } from "@angular/forms/signals";
import { HttpBaseZ } from "../../../../components/http-base";
import { ComboBoxBridge } from "../combo-box.bridge";
import { ComboBoxInputReaction } from "./input.react";

@Directive()
export class ComboBoxInputInit {
   bridge = inject(ComboBoxBridge);
   reactions = inject(ComboBoxInputReaction);

   private searchModel = signal<string>('');
   searchForm = form(this.searchModel, p => debounce(p, 300));

   searchInputRef = viewChild.required<ElementRef<HTMLInputElement>>('searchInput');

   oldItem: any = null;
   textbox!: HTMLInputElement;
   http_!: HttpBaseZ;

   constructor() {
      effect(() => this.http_ = this.bridge.http());
      effect(() => {
         this.textbox = this.searchInputRef().nativeElement;
         this.reactions.textbox = this.textbox;
      });

      this.reactions.form = this.searchForm;


      effect(() => {
         this.bridge.http().setPagination({ limit: 3 })
      })

      effect(() => this.reactions.onValue(this.bridge.value()));

      effect(() => this.reactions.onSearch(
         this.searchForm().value().trim()
      ));

      effect((clean) => {
         clean(() => this.bridge.index.set(-1));
         this.reactions.onChunks(this.http_.chunks());
      });

      effect(() => this.reactions.onItem(this.bridge.item()));

      effect(() => this.reactions.select(this.searchForm().value()));
   }
   ngOnDestroy() {
      this.http_.resetPagination();
   }
}