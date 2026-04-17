import { effect, inject, Injectable, Injector, InputSignal, ModelSignal, Signal, signal } from "@angular/core";
import { Popup } from "../../popup/popup";
import { DropBoxList } from "./list/list";
import { DropBoxSearch } from "./search/search";

@Injectable()
export class DropBoxService {
    value!: ModelSignal<string | null>;
    list!: InputSignal<any[]>;
    by!: InputSignal<string>;
    dropboxList!: Signal<DropBoxList>;
    dropboxSearch!: Signal<DropBoxSearch>;
    popup!: Signal<Popup>;
    items = signal<any[]>([]);
    item = signal<any>(null);

    injector = inject(Injector);


    constructor() {
        effect(this.resetItems);
    }

    resetItems = () => {
        const list = this.list() ?? [];

        for (const [index, item] of list.entries()) {
            item.index = index;
            item.marked = item[this.by()];
        }

        this.items.set(list);
    }
}