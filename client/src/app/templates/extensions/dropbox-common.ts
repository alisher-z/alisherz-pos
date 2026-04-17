import { Directive, input } from "@angular/core";
import { FieldTree } from "@angular/forms/signals";
import { HttpBaseZ } from "../../components/http-base";

@Directive()
export abstract class FormDropBoxCommons {
   abstract http: HttpBaseZ;

   label = input<string | null>(null);
   field = input.required<FieldTree<string>>();

   get list() {
      return this.http.chunks();
   }

   get field_() {
      return this.field();
   }
}