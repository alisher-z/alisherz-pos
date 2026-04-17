import { ComponentRef, contentChild, contentChildren, Directive, effect, inject, ViewContainerRef } from "@angular/core";
import { TableZ } from "../table";
import { TableBodyRowDirective } from "./body-row";
import { TableHeadRowDirective } from "./head-row";

@Directive({ selector: '[ztable]' })
export class TableZDirective {
   private vcr = inject(ViewContainerRef);

   private headTr = contentChild(TableHeadRowDirective);
   private bodyTr = contentChildren(TableBodyRowDirective);


   private cr: ComponentRef<TableZ>;
   private shell: TableZ;

   constructor() {
      this.cr = this.vcr.createComponent(TableZ);
      this.shell = this.cr.instance;

      effect(() => {
         const thead = this.headTr();
         const bodyTRs = this.bodyTr();

         this.shell.setHeadRow(thead?.tr);
         this.shell.vcr.clear();

         for (const row of bodyTRs)
            row.createView(this.shell);
      })
   }
}