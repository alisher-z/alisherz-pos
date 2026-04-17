import { computed, Injectable } from "@angular/core";
import { HttpProductZ } from "../product.http";

@Injectable({ providedIn: 'root' })
export class HttpProductSelfZ extends HttpProductZ {
    override model: string = 'self';

    productMap = computed(() => {
        const list: any[] = this.chunks();
        if (!list)
            return new Map<string, any>();

        return new Map<string, any>(list.map(p => [p.pk, p]));
    });
}