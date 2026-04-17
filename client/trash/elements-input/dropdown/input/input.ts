import { afterRenderEffect, AfterViewInit, Component, effect, ElementRef, inject, Injector, input, model, output, viewChild } from '@angular/core';
import { IconButton } from "../../../buttons/icon-button/icon-button";
import { DropdownTextUtils } from './input.utils';

@Component({
  selector: 'dropdown-text',
  templateUrl: './input.html',
  styleUrl: './input.scss',
  imports: [IconButton],
  providers: [DropdownTextUtils],
})
export class DropdownText implements AfterViewInit {
  injector = inject(Injector);
  constructor() {
    afterRenderEffect({
      read: () => console.log(this.utils.dropdown.filteredList())
    })
  }
  ngAfterViewInit(): void {
    effect(async () => {
      // await waitForMe(1000);
      this.utils.setIndexByPK(this.pk());
      console.log(this.pk());
      this.setText();
    }, { injector: this.injector });
    effect(async () => {
      // await waitForMe(1000);
      console.log('entered');
      this.pk.set(this.utils.item?.['pk'] ?? null);
    }, { injector: this.injector });
  }





  pk = model.required<string | null>();



  identity = input<string>();
  disabled = input<boolean>(false);



  blurE = output<any>();



  utils = inject(DropdownTextUtils);



  private oldData: any = null;


  private searchInputRef = viewChild
    .required<ElementRef<HTMLInputElement>>('textInput');





  btnClick(e: MouseEvent) {
    e.preventDefault();
    this.utils.popup.toggle();
    this.searchInput.select();
  }



  blur({ value }: HTMLInputElement) {
    this.setText();
    this.blurE.emit(this.utils.item);

    if (value)
      this.utils.redesignList();
  }



  input({ value }: HTMLInputElement) {
    this.utils.dropdownList.setIndex(-1);
    this.utils.filter(value);
    if (value)
      this.utils.dropdownList.setIndex(0);
  }



  focus() {
    this.oldData = this.utils.item;
    this.utils.dropdownList.setIndex(
      this.utils.item?.index ?? -1
    )
    this.utils.popup.show();
    this.searchInput.select();
  }



  enter(e: Event) {
    if (this.utils.popup.opened())
      e.preventDefault();
    console.log('hello');
    this.utils.popup.hide();
    this.setText();

    if ((<HTMLInputElement>e.target).value)
      this.utils.redesignList();

    this.oldData = this.utils.item;
  }



  escape(e: Event) {
    this.utils.dropdown.item.set(this.oldData);
    if (this.oldData?.[this.utils.field] !== (<any>e.target).value && (<any>e.target).value !== '')
      e.stopPropagation();

    this.setText();
    this.searchInput.select();

    this.utils.redesignList();
    this.utils.dropdownList.setIndex(
      this.oldData?.index ?? -1
    );
  }



  arrowdown(e: Event) {
    e.preventDefault();
    if (!this.utils.popup.opened()) {
      this.utils.dropdownList.setIndex(-1);
      this.utils.dropdownList.setIndex(this.utils.item?.index ?? -1);
      this.searchInput.select();
      return this.utils.popup.show();
    }

    this.utils.dropdownList.increaseIndex();
    this.searchInput.select();
  }



  arrowup(e: Event) {
    e.preventDefault();

    this.utils.dropdownList.decreaseIndex(true);
    this.searchInput.select();
  }



  keydown(e: KeyboardEvent) {
    if (e.key.length <= 1)
      this.utils.popup.show();
  }





  get searchInput() {
    return this.searchInputRef().nativeElement;
  }





  private setText() {
    this.searchInput.value = this.utils.item?.[this.utils.field] ?? '';
  }
}
