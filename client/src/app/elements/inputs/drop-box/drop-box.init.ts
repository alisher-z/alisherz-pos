import { contentChild, Directive, effect, inject, input, model, output, TemplateRef, viewChild } from "@angular/core";
import { FormValueControl, ValidationError, WithOptionalField } from "@angular/forms/signals";
import { v4 } from "uuid";
import { ElExposer } from "../../extensions/element-exposer";
import { Popup } from "../../popup/popup";
import { DropBoxService } from "./drop-box.service";
import { DropBoxList } from "./list/list";
import { DropBoxSearch } from "./search/search";

@Directive()
export class DropBoxInit extends ElExposer<HTMLElement> implements FormValueControl<string | null> {
    constructor() {
        super();
        this.service.value = this.value;
        this.service.list = this.list;
        this.service.by = this.by;
        this.service.dropboxList = this.dropboxList;
        this.service.dropboxSearch = this.dropboxSearch;
        this.service.popup = this.popup;
    }

    left = output<any>();
    live = output<any>();
    self = output<HTMLInputElement | null>();

    label = input<string | null>(null);
    value = model<string | null>(null);
    disabled = input<boolean>(false);
    invalid = input<boolean>(false);
    touched = input<boolean>(false);
    required = input<boolean>(false);
    errors = input<readonly WithOptionalField<ValidationError>[]>([]);

    list = input.required<any[]>();
    by = input<string>('name');

    elID = v4();

    service = inject(DropBoxService);

    row = contentChild<TemplateRef<any> | null>('row');
    dropboxList = viewChild.required(DropBoxList);
    dropboxSearch = viewChild.required(DropBoxSearch);
    popup = viewChild.required(Popup);

    onDropboxSearch = effect(() => {
        try {
            this.dropboxSearch()?.service.searchInput;
        } catch { }
    });

    onDropboxList = effect(() => {
        try {
            const { width } = this.native.getBoundingClientRect();
            this.dropboxList()?.parentWidth.set((width / 10) + 'rem');
        } catch { }
    });
}