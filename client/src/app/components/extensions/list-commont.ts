import { Directive, inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpBaseZ } from "../http-base";

@Directive()
export abstract class ComponentListCommonProperties {
   abstract http: HttpBaseZ;

   router = inject(Router);
   route = inject(ActivatedRoute);

   // get items(): any[] {
   //    return this.http.chunks();
   // }

   edit({ item }: any) {
      this.router.navigate(['form', item.pk], { relativeTo: this.route });
   }
}