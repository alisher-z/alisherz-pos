import { Directive, input } from "@angular/core";

@Directive({ selector: '[vlist]' })
export class VirtualTableList {
   vlist = input<any[]>();

   get items() {
      return this.vlist();
   }

   // e = effect(() => console.log(this.items));

   get value() {
      const items = this.vlist();

      return items
         ? items.map((item, index) => ({
            ...item, vindex: index
         }))
         : [];
   }

}