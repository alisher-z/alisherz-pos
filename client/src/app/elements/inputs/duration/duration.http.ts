import { httpResource } from "@angular/common/http";
import { computed, Injectable, signal } from "@angular/core";
import { SERVER_URL } from "../../../utils/variables";

@Injectable()
export class HttpServiceDurationZ {
   #url = SERVER_URL;
   argument = signal<string | null>(null);
   arguments = signal<any[] | null>(null);

   duration = computed(() => this.#durationResource.value());
   durations = computed(() => this.#durationsResource.value());

   #durationResource = httpResource<{ hours: number, duration: string | null } | undefined>(() =>
      this.argument() === null ? undefined :
         ({
            url: this.#uri + 'get-duration',
            method: 'POST',
            body: {
               duration: this.argument()
            }
         })
   );

   #durationsResource = httpResource<any[] | undefined>(() =>
      !this.arguments() ? undefined :
         ({
            url: this.#uri + 'get-durations',
            method: 'POST',
            body: this.arguments()
         }))

   get #uri() {
      return `${this.#url}/service/`;
   }
}