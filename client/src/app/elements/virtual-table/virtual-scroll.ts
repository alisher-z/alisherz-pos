import { computed, Directive, effect, ElementRef, output, signal, viewChild } from "@angular/core";

@Directive({
   host: {
      '[style.--spacerHeight]': 'spacerHeight()+"px"',
      '[style.--virtualPosition]': 'virtualPostion()'
   }
})
export class VirtualTableScroll {
   nextPage = output<void>();
   viewportRef = viewChild.required<ElementRef<HTMLTableRowElement>>('viewport');

   resizeObserver: ResizeObserver | null = null;
   bufferSize = 15;

   items = signal<any[]>([]);
   viewportHieght = signal<number>(0);
   itemHeight = signal<number>(24);
   scrollTop = signal<number>(0);

   spacerHeight = computed(() => this.items().length * this.itemHeight());
   startIndex = computed(() => Math.floor(this.scrollTop() / this.itemHeight()));
   numberOfItems = computed(() => Math.ceil(this.viewportHieght() / this.itemHeight()));

   shouldNext = true;

   visibleItems = computed(() => {
      const start = Math.max(0, this.startIndex() - this.bufferSize);
      const end = start + this.numberOfItems() + this.bufferSize;

      return this.items().slice(start, end);
   });

   virtualPostion = computed(() => {
      const bufferStart = Math.max(0, this.startIndex() - this.bufferSize);
      const position = bufferStart * this.itemHeight();
      return position + 'px';
   })

   setViewportHeight = effect(() => {
      const el = this.viewportRef().nativeElement;
      this.destroyResizeObserver();

      this.resizeObserver = new ResizeObserver(entries =>
         this.viewportHieght.set(entries[0].contentRect.height)
      );

      this.resizeObserver.observe(el);
   });

   scroll(el: HTMLElement) {
      // requestAnimationFrame(() => {
      this.scrollTop.set(el.scrollTop);
      // });
      this.paging();
   }

   ngOnDestroy() {
      this.destroyResizeObserver();
   }

   destroyResizeObserver() {
      if (!this.resizeObserver) return;

      this.resizeObserver.disconnect();
      this.resizeObserver = null;
   }

   paging() {
      const start = this.startIndex();
      const len = this.items().length;

      if ((start / len) > 0.7 && this.shouldNext) {
         this.shouldNext = false;
         this.nextPage.emit();
      }
   }

   setShouldNext = effect(() => {
      this.items();
      this.shouldNext = true;
   });
}