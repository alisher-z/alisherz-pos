import { computed, Injectable } from "@angular/core";
import { HttpServiceZ } from "../service.http";

@Injectable({ providedIn: 'root' })
export class HttpServiceSelfZ extends HttpServiceZ {
   override model: string = 'self';

   serviceMap = computed(() => {
      const list: any[] = this.chunks();

      if (!list)
         return new Map<string, any>();

      return new Map<string, any>(list.map(p => [p.pk, p]));
   })
}