import { Directive, inject, input, TemplateRef } from "@angular/core";
import { TableZ } from "../table";

@Directive({ selector: '[bodytr]' })
export class TableBodyRowDirective {
   tr = inject(TemplateRef);

   bodytrOf = input.required<any[]>();

   createView(shell: TableZ) {
      const items = this.bodytrOf();
      if (!items || items.length < 1)
         return;

      for (const [index, item] of items.entries())
         shell.createView([item, index, this.tr])
   }
}