import { Directive, input, model } from "@angular/core";
import { FieldTree, FormValueControl } from "@angular/forms/signals";
import { HttpBaseZ } from "../../components/http-base";

@Directive()
export abstract class FormCommonInput<T> implements FormValueControl<string | null> {
   abstract http: HttpBaseZ;

   tree = input.required<FieldTree<T>>();
   value = model<string | null>(null);
   label = input<string | null>(null);
}