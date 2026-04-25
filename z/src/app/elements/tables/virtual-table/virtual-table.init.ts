import { afterNextRender, afterRenderEffect, computed, contentChild, contentChildren, Directive, effect, ElementRef, input, output, signal, TemplateRef, viewChild } from "@angular/core";
import { VirtualTableList } from "./virtual-table.list";

/**
 * Manages the core reactive logic for calculating the virtual viewport.
 * It uses a 'spacer' to simulate the full height of the list while only 
 * rendering a small 'chunk' of items for performance.
**/
@Directive({
   host: {
      // Binds calculated signal values to CSS variables for layout management.
      '[style.--spacerHeight]': 'spacerHeight()',
      '[style.--virtualPosition]': 'virtualPosition()',
      '[style.--columns]': 'columns()'
   }
})
export class VirtualTableInit {
   constructor() {
      /**
       * Initialization: ResizeObserver
       * Tracks the height of the viewport container to determine how many 
       * items fit on the screen at once.
      **/
      afterNextRender({
         read: () => {
            const el = this.viewportEl;
            this.destroyResizeObserver();
            this.resizeObserver = new ResizeObserver(e =>
               this.viewportHeight.set(e[0].contentRect.height)
            );
            this.resizeObserver.observe(el);
         }
      });

      // afterRenderEffect({
      //    read: () => {
      //       /// TODO work on it, becuase it triggers always
      //       const row = this.bodyRowRef();
      //       if (!row) return;

      //       const height = row.nativeElement.getBoundingClientRect().height;

      //       this.itemHeight.set(height ?? 20);
      //       console.log('triggered');
      //    }
      // });

      /**
       * afterRenderEffect: Scroll Into View
       * Monitors the 'activePK' signal. When the highlighted item changes (via keyboard 
       * navigation), it ensures the corresponding row element is scrolled into focus.
      **/
      // afterRenderEffect({
      //    write: () => {
      //       this.activePK();
      //       this.scrollIntoView();
      //    }
      // });
      afterRenderEffect(() => {
         this.activePK();
         this.scrollIntoView();
      })

      /**
       * Infinite Scroll Logic:
       * Emits a 'nextChunk' event when the user has scrolled through 70% 
       * of the current data.
      **/
      effect(() =>
         this.shouldRequestNextChunk()
            ? this.nextChunk.emit() : null
      );
   }

   list = input<any[]>();
   numberOfColumns = input<number>();
   isActionBtns = input<boolean>(true);
   isHead = input<boolean>(true);
   isFoot = input<boolean>(true);
   activePK = input<string>();

   rowDownClick = output<{ event: MouseEvent, item: any }>();
   editClick = output<any>();
   deleteClick = output<any>();
   nextChunk = output<void>();

   viewportHeight = signal<number>(0);
   scrollPosition = signal<number>(0);
   itemHeight = signal<number>(30);

   listChunks = contentChildren(VirtualTableList);
   trContent = contentChild<TemplateRef<any>>('row');

   headRowRef = viewChild<ElementRef<HTMLElement>>('headRow');
   // bodyRowRef = viewChild<ElementRef<HTMLElement>>('bodyRow');
   viewportRef = viewChild.required<ElementRef<HTMLElement>>('viewport');

   spacerHeight = computed(() =>
      `${this.chunks().length * this.itemHeight()}px`
   );

   startIndex = computed(() => Math.floor(
      this.scrollPosition() / this.itemHeight()
   ));

   extendedStartIndex = computed(() =>
      Math.max(0, this.startIndex() - this.chunkExtension)
   );

   extendedEndIndex = computed(() =>
      this.startIndex() + this.numberOfItems() + this.chunkExtension
   );

   numberOfItems = computed(() => Math.floor(
      this.viewportHeight() / this.itemHeight()
   ));

   shouldRequestNextChunk = computed(() =>
      this.chunks().length > 0
      &&
      this.startIndex() / this.chunks().length > 0.7
   );

   columns = computed(() => {
      const columns = this.numberOfColumns();
      const headRow = this.headRowRef();

      if (columns) return columns;
      if (!headRow) return 0;

      return headRow.nativeElement.children.length;
   });

   chunks = computed(() => {
      const list = this.list();
      if (list) return list;

      const listChunks = this.listChunks();
      const chunks: any[] = [];

      for (const chunk of listChunks)
         chunks.push(...chunk.value);

      return chunks;
   });

   visibleChunks = computed(() =>
      this.chunks().slice(
         this.extendedStartIndex(),
         this.extendedEndIndex()
      ));

   virtualPosition = computed(() =>
      `${this.extendedStartIndex() * this.itemHeight()}px`
   );

   resizeObserver: ResizeObserver | null = null;
   activeRow: HTMLElement | undefined;
   chunkExtension = 15;

   get viewportEl() {
      return this.viewportRef().nativeElement;
   }

   destroyResizeObserver() {
      if (!this.resizeObserver) return;

      this.resizeObserver.disconnect();
      this.resizeObserver = null;
   }

   scrollIntoView() {
      this.activeRow?.scrollIntoView({ behavior: 'instant', block: 'nearest' });
   }
}