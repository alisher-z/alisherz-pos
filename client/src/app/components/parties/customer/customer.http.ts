import { Injectable } from "@angular/core";
import { HttpPartyZ } from "../party.http";

type CustomerQuery = {
    pk: string;
    limit: number;
    offset: number;
    search: string;
}

@Injectable({ providedIn: 'root' })
export class HttpCustomerZ extends HttpPartyZ {
    override model: string = 'customer';

    // pagination = signal<boolean>(true);

    // stream = signal<any[]>([]);

    // #resource = httpResource(() => ({
    //     url: this.uri,
    //     params: {
    //         ...this.query()
    //     }
    // }), {
    //     parse: (res: any): any[] => res.success
    // });

    // createStream = effect(() => {
    //     const pagination = this.pagination();
    //     if (pagination) return;

    //     const chunks = this.#resource.value();
    //     if (!chunks || chunks.length < 1) return;

    //     this.query.update(q => ({
    //         ...q,
    //         offset: q.offset + 1
    //     }));
    //     this.stream.update(s => [...s, ...chunks]);
    //     console.log('requested');
    // });

    // createPages = effect(() => {
    //     const pagination = this.pagination();
    //     if (!pagination) return;

    //     const chunks = this.#resource.value();
    //     if (!chunks || chunks.length < 0)
    //         return;
    //     this.stream.set(chunks);
    // });

    // get customers() {
    //     return this.stream();
    // }
}