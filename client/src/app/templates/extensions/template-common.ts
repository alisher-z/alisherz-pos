import { Directive, effect, input, Signal, untracked } from "@angular/core";
import { FieldTree } from "@angular/forms/signals";
import { CommonType } from "../../types/form/common";

@Directive()
export abstract class FormTemplateCommons<T> {
   abstract fieldTree: Signal<any>;

   tree = input.required<FieldTree<T>>();
   pkTree = input<FieldTree<string>>();
   btn = input<boolean>(false);

   onFresh = effect(() => {
      try {
         const fresh = this.fieldTree_.fresh().value();

         const pkTree = untracked(this.pkTree);
         if (!pkTree)
            return;

         if (fresh)
            pkTree().value.set(untracked(this.fieldTree_.pk().value));
      } catch (error) {
         console.log(error);
      }
   });

   get fieldTree_() {
      return this.fieldTree() as FieldTree<CommonType>;
   }

   get pkTree_() {
      return this.pkTree();
   }

   get form() {
      return this.tree();
   }

   get fresh() {
      return this.fieldTree_.fresh().value();
   }
}