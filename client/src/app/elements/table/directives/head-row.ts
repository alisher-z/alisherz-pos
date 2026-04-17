import { Directive, inject, TemplateRef } from "@angular/core";

@Directive({ selector: '[headtr]' })
export class TableHeadRowDirective {
   tr = inject(TemplateRef);
}