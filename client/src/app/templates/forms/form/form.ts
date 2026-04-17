import { CdkTrapFocus } from '@angular/cdk/a11y';
import { Component, effect, inject, input, model, output } from '@angular/core';
import { FieldTree, submit } from '@angular/forms/signals';
import { HttpBaseZ } from '../../../components/http-base';
import { IconLink } from "../../../elements/buttons/icon-link/icon-link";
import { Icon } from "../../../elements/buttons/icon/icon";
import { NormalButton } from "../../../elements/buttons/normal-button/normal-button";
import { BaseFormUtils } from './form.utils';

@Component({
  selector: 'base-formz',
  templateUrl: './form.html',
  styleUrl: './form.scss',
  imports: [CdkTrapFocus, NormalButton, Icon, IconLink],
  providers: [BaseFormUtils]
})
export class BaseFormz<T> {
  form = input.required<FieldTree<T, string | number>>();
  http = input.required<HttpBaseZ>();
  utils = inject(BaseFormUtils);
  structured = model.required<any>();
  makeit = output<void>();


  request = effect(() => {
    const data = this.structured();
    if (!data) return;

    submit(this.#form, async () => await this.#post({ ...data }));
    this.structured.set(null);
  });


  send(e: SubmitEvent) {
    e.preventDefault();
    this.makeit.emit();
  }

  async #post(data: any) {
    try {
      const res: any = await this.#http.post(data);
      console.log(res.success);
      return undefined;
    }


    catch (error: any) {
      console.log(error.error.error);
      return {
        kind: 'form submission error',
        message: 'something is wrong!'
      }
      // return customError({
      //   message: 'something is wrong!'
      // });
    }
  }

  get #form() { return this.form(); }
  get #http() { return this.http(); }

  ngOnDestroy() {
    this.#http.onePK.set(null);
  }
}
