import { inject, Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Injectable()
export class BaseFormUtils {
    router = inject(ActivatedRoute);
    pk: string | null;

    constructor() {
        this.pk = this.router.snapshot.paramMap.get('pk');
    }

    close() {
        return this.pk ? '../..' : '../';
    }
}