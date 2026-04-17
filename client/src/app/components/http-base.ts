import { HttpClient, httpResource } from '@angular/common/http';
import { computed, inject, Injectable, linkedSignal, signal, WritableSignal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { SERVER_URL } from '../utils/variables';

@Injectable()
export abstract class HttpBaseZ {
  protected abstract namespace: string;
  protected abstract model: string;

  protected readonly url = SERVER_URL;
  protected readonly http = inject(HttpClient);
  protected singlePage = false;

  readonly onePK = signal<string | null>(null);

  readonly pagination = {
    limit: signal(750),
    page: signal(0)
  }

  readonly query: APIQuerySignal = {
    pk: signal(''),
    search: signal(''),
    reset: signal(false)
  }

  protected readonly chunksParams = computed(() => ({
    limit: this.pagination.limit(),
    page: this.pagination.page(),
    pk: this.query.pk(),
    search: this.query.search(),
    reset: this.query.reset()
  }));

  private parse = (res: any): any[] => res.success;

  private oneResource = httpResource<any | undefined>(() => {
    const pk = this.onePK();
    return pk ? `${this.uri}/${pk}` : undefined
  }, { parse: this.parse });

  private chunksResource = httpResource<any[] | undefined>(() => ({
    url: this.uri,
    params: this.chunksParams()
  }), { parse: this.parse });

  readonly one = computed(() => this.oneResource.value());

  readonly chunks = linkedSignal({
    source: () => this.chunksResource.value(),
    computation: (chunk, s): any[] => this.singlePage
      ? chunk ?? s?.value ?? []
      : [...(s?.value ?? []), ...(chunk ?? [])]
  });

  post(data: any) {
    return firstValueFrom(this.http.post(this.uri, data));
  }

  setQuery({ pk, search, reset }: Partial<APIQuery>) {
    this.query.pk.set(pk ?? '');
    this.query.search.set(search ?? '');
    this.query.reset.set(reset ?? false);
  }

  setPagination({ limit, page }: { limit?: number, page?: number }) {
    this.pagination.limit.set(limit ?? 750);
    this.pagination.page.set(page ?? 0);
  }

  resetPagination() {
    this.pagination.limit.set(750);
    this.pagination.page.set(0);
  }

  asSinglePage() { this.singlePage = true; }
  asMultiPage() { this.singlePage = false; }

  get uri() { return `${this.url}/${this.namespace}/${this.model}`; }
}

export type APIQuery = {
  pk: string | null,
  search: string,
  reset: boolean
} & Record<string, any>;

export type APIQuerySignal = {
  pk: WritableSignal<string>,
  search: WritableSignal<string>,
  reset: WritableSignal<boolean>
} & Record<string, WritableSignal<any>>;