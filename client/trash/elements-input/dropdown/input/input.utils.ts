import { effect, inject, Injectable, untracked } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { DropdownInputUtils } from "../dropdown.utils";

@Injectable()
export class DropdownTextUtils {
    constructor() {
        effect(this.redesignList);
        effect(this.onIndex);
    }





    sanitizer = inject(DomSanitizer);
    dropdown = inject(DropdownInputUtils);





    redesignList = () => {
        for (const [index, value] of this.list.entries())
            this.addExtraFields(value, index);

        this.setFilteredList(this.list);
    }



    filter(text: string) {
        const list: any[] = [];
        const find: (item: any) => any = this.findAndMark(text);

        for (const item of this.list_) {
            const _item = find(item);
            _item ? list.push(_item) : null;
        }

        this.arrangeList(list, text);
        this.setFilteredList(list);
    }



    async setIndexByPK(pk: string | null) {
        if (pk === this.item_?.['pk'])
            return;

        console.log(pk);
        if (!pk)
            return this.dropdownList.setIndex(-1);
        console.log(this.filtered_);

        const index = this.filtered_.findIndex(i => i['pk'] === pk);
        this.dropdownList.setIndex(index);
    }





    get item() { return this.dropdown.item(); }
    get item_() { return untracked(this.dropdown.item); }
    get field() { return this.dropdown.filterBy(); }
    get popup() { return this.dropdown.popup(); }
    get dropdownList() { return this.dropdown.dropdownList(); }



    private get list() { return this.dropdown.list() ?? []; }
    private get list_() { return untracked(this.dropdown.list) ?? []; }
    private get filtered_() { return untracked(this.dropdown.filteredList); }
    private get index() { return this.dropdown.index(); }





    private onIndex = async () => {
        this.setItem(this.index);
    }



    private addExtraFields(item: any, index: number) {
        item.index = index;
        item.marked = item[this.field];
    }



    private arrangeList(list: any[], text: string) {
        text ? this.sort(list) : this.revert(list);
    }



    private sort(list: any[]) {
        list.sort(
            (a, b) => a.sorting !== b.sorting
                ? a.sorting - b.sorting
                : a[this.field].toLowerCase().localeCompare(
                    b[this.field].toLowerCase()
                )
        );
    }



    private revert(list: any[]) {
        list.sort((a, b) => a.index - b.index);
    }



    private mark(text: string) {
        text = text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        return new RegExp(`(${text})`, 'i');
    }



    private findAndMark(text: string) {
        const contains = new RegExp(text, 'i');
        const starts = new RegExp(`^${text}`, 'i');
        const ends = new RegExp(`${text}$`, 'i');
        const marked = this.mark(text);

        return (item: any) => {
            const _item = { ...item };
            const value: string = _item[this.field];
            if (!contains.test(value))
                return null;

            _item['marked'] = this.sanitizer.bypassSecurityTrustHtml(
                value.replace(marked, '<mark>$1</mark>')
            );

            _item['sorting'] = starts.test(value) ? 1 : ends.test(value) ? 3 : 2;

            return _item;
        }
    }



    private setFilteredList(list: any[]) {
        this.dropdown.filteredList.set(list);
    }



    private setItem(index: number) {
        this.dropdown.item.set(
            this.filtered_[index] ?? null
        );
    }
}