import { httpResource } from '@angular/common/http';
import { Injectable, linkedSignal } from '@angular/core';
import { HttpDeclarations } from './http.declarations';

@Injectable()
export abstract class HttpBase extends HttpDeclarations {
  private parse = (res: any): any[] => res.success;

  private chunksResource = httpResource<any[] | undefined>(
    () => ({
      url: this.getURI(),
      params: this.chunksParams(),
    }),
    { parse: this.parse },
  );

  readonly chunks = linkedSignal({
    source: () => this.chunksResource.value(),
    computation: (chunk, s): any[] => [...(s?.value ?? []), ...(chunk ?? [])],
  });
}
