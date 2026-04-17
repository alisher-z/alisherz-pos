import { Injectable, InputSignal, Signal, signal } from "@angular/core";
import { Popup } from "../../popup/popup";
import { DropdownText } from "./input/input";
import { DropdownList } from "./list/list";

@Injectable()
export class DropdownInputUtils {
    list!: InputSignal<any[]>;
    filterBy!: InputSignal<string>;
    filteredList = signal<any[]>([]);
    item = signal<any>(null);
    index = signal<number>(-1);
    dropdownSearch!: Signal<DropdownText>;
    dropdownList!: Signal<DropdownList>;
    popup!: Signal<Popup>;
}