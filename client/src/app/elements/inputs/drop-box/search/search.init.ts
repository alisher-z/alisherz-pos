import { Directive, effect, ElementRef, inject, input, output, viewChild } from "@angular/core";
import { DropBoxSearchService } from "./search.service";

@Directive()
export class DropBoxSearchInit {
   identity = input<string | null>(null);
   left = output<any>();


   searchInput = viewChild<ElementRef<HTMLInputElement>>('search');
   service = inject(DropBoxSearchService);


   oldData: any = null;


   onSearchInput = effect(() =>
      this.service.searchInput = this.searchInput()
         ?.nativeElement ?? null
   );
}