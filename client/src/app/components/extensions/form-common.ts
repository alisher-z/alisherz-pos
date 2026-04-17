import { Directive, effect, inject, signal, WritableSignal } from "@angular/core";
import { FieldTree } from "@angular/forms/signals";
import { ActivatedRoute } from "@angular/router";
import { HttpBaseZ } from "../http-base";

@Directive()
export abstract class FormCommonProperties<T> {
   abstract http: HttpBaseZ;
   abstract modelz: WritableSignal<T>;
   abstract formz: FieldTree<T, string | number>;
   abstract makeit(): void;



   route = inject(ActivatedRoute);



   data = signal<any | null>(null);
   structured = signal<any>(null);



   setValues = effect(() => {
      this.http.onePK.set(this.pk);
      const data: unknown = this.http.one();
      if (!this.pk || !data)
         return this.data.set(null);

      this.data.set(data);
   });

   get pk() {
      return this.route.snapshot.paramMap.get('pk');
   }
}