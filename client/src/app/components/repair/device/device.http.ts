import { computed, Injectable, signal } from "@angular/core";
import { HttpRepairZ } from "../repair.http";

@Injectable({ providedIn: 'root' })
export class HttpDeviceZ extends HttpRepairZ {
   override model: string = 'device';

   constructor() {
      super();
      this.query['customer'] = signal<string>('');
   }

   override chunksParams = computed(() => ({
      limit: this.pagination.limit(),
      page: this.pagination.page(),
      pk: this.query.pk(),
      search: this.query.search(),
      reset: this.query.reset(),
      customer: this.query['customer']()
   }));
}